const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const event = require('./event');
const redis = require('./redisClient')

const ioHelper = require('./helper/io');
const statusHelper = require('./helper/status');
const scoreHelper = require('./helper/score');

io.on('connection', (socket) => {

  // GAME SELECTION
 socket.on(event.NEW_GAME, () => {
    socket.broadcast.emit(event.NEW_GAME);
  });

  socket.on(event.GAME_UPDATE, () => {
    socket.broadcast.emit(event.GAME_UPDATE);
  });


  // GAME
  /**
   * A user join the game, keep in mind that they can join a game already running if there were already in the game before
   * @param data contain the game the user join and the authentificated user data
   * Check if user has a score, initial its score if they haven't
   * Send back all user scores to the react client
   */
  socket.on(event.USER_JOIN_GAME, (data) => {
    // fetch player list (fetch api)
    const { game, authUser } = data;

    socket.join(ioHelper.getRoom(game.id));

    redis.getUserScore(game.id, authUser.username)
    .then((userScore) => {
      if(userScore === null){
        redis.setUserScore(game.id, authUser.username, 0)
      }
    })
    .then( () => redis.getAllUserScore(game.id))
    .then( (usersScores) => {
      let objectResponse = scoreHelper.hashToJson(usersScores);
      let responseData = { score: objectResponse };
      io.in(ioHelper.getRoom(game.id)).emit(event.USER_JOIN_GAME, responseData);

      if(game.status == 2){
        return redis.getGameStatus(game.id)
      }

    }).then( (gameStatus) => {
      if(gameStatus){
        io.in(ioHelper.getRoom(game.id)).emit(event.SET_DEFAULT_STATUS, { status: parseInt(gameStatus) });
      }
    });

  });

  socket.on(event.USER_POST_CHAT, (data) => {
    const { message, game } = data;
    socket.to(ioHelper.getRoom(game.id)).emit(event.USER_POST_CHAT, message);
  });

  /**
   * Event call when the game is launch
   */
  socket.on(event.LAUCH_GAME, (gameId) => {
    socket.to(ioHelper.getRoom(gameId)).emit(event.LAUCH_GAME);
    //initialise score counter
    redis.setScoreCounter(gameId, 1);
    // initialise status
    redis.setGameStatus(gameId, 0);
  });

  /**
   * event call by the creator of the game in order to send the animes to guess to the others players
   */
  socket.on(event.SEND_ANIME_TO_GUESS, (data) => {
    const { animeToGuess, gameId } = data;
    io.in(ioHelper.getRoom(gameId)).emit(event.SEND_ANIME_TO_GUESS, animeToGuess);
  });


  /**
   * Change status from waiting time to music playing
   */
  socket.on(event.CHANGE_STATUS_0_TO_1, (data) => {
    const { gameId } = data;
    
    redis.getGameStatus(gameId).then( (gameStatus) => {

      if(gameStatus == 0){

        let timeToWait = statusHelper.getTimeOutInSecond(1);
        let timeout = statusHelper.getTimeout(0)

        setTimeout( () => {
          redis.setGameStatus(gameId, 1);
      
          redis.getGameTurnNumber(gameId)
          .then((turnNumber) => {
            let newTurnNumber = 0;
            if(turnNumber){
              newTurnNumber = parseInt(turnNumber) + 1;
            }
            redis.setTurnNumber(gameId, newTurnNumber)
          })
          io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_0_TO_1, { timeToWait });
    
        }, timeout);
      }
    });

    
  });

  /**
   * Change status from music pl
  /**
   * @param data, contain the gameId and the runningStatus of this game
   * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
   */
  socket.on(event.CHANGE_STATUS_1_TO_2, (data) => {
    const { gameId } = data;

    redis.getGameStatus(gameId).then( (gameStatus) => {
      if(gameStatus == 1){

        let timeToWait = statusHelper.getTimeOutInSecond(2);
        let timeout = statusHelper.getTimeout(1)
        setTimeout( () => {
          redis.setGameStatus(gameId, 2);
  
          let data = {};
          redis.getAllUserScore(gameId)
          .then( (usersScores) => {
            data = {
              ...data,
              usersScores,
            }
            return redis.getGameTurnNumber(gameId);
          })
          .then( (turnNumber) => {
            let scoreJson = scoreHelper.hashToJson(data.usersScores, turnNumber);
            let response = { score: scoreJson, timeToWait };
  
            io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_1_TO_2, response);
          });
        }, timeout);
      }
    });
  });

  /**
     * @param data, contain the gameId and the runningStatus of this game
     * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
    */
  socket.on(event.CHANGE_STATUS_2_TO_0, (data) => {
    const { gameId } = data;

    redis.getGameStatus(gameId).then( (gameStatus) => {
      
      if(gameStatus == 2){
        let timeToWait = statusHelper.getTimeOutInSecond(0);
        let timeout = statusHelper.getTimeout(2)
        setTimeout( () => {
          redis.setGameStatus(gameId, 0);
  
          redis.setScoreCounter(gameId, 1);
          io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_2_TO_0, { timeToWait });
  
        }, timeout);

      }
    });
  });

  /**
   * Event called when a user choose an answer, in order to increment their score or not
   * and tell other player when another payer answer 
   */
  socket.on(event.CLICK_ANSWER, (data) => {
    const { gameId, authUser, findAnime, anime } = data;

    // return value, set default data
    let newScore = {
      username: authUser.username,
      anime,
    };

    socket.broadcast.emit(event.CLICK_ANSWER, {
      authUser, findAnime
    });

    // if the user has right or wrong
    if(findAnime === true){
      redis.getScoreCounter(gameId)
      .then( (scoreCounter) => {
        let rank = parseInt(scoreCounter); // ranking of the player during the turn
        redis.setScoreCounter(gameId, rank + 1); // incremente rank

        // get score of the turn depeding of the rank of the player
        let scoreTurn = scoreHelper.genereScore(rank);
        newScore = {
          ...newScore,
          scoreTurn,
          rank,
        }
        return redis.getUserScore(gameId, authUser.username);
      })
      .then( (userScore) => {
        let jsonUserScore = JSON.parse(userScore);

        // get previous score, set it to 0 by default if the player doesn't have any 
        let currentScore = 0;
        if(jsonUserScore.score){
          currentScore = jsonUserScore.score;
        }

        newScore = {
          ...jsonUserScore,
          ...newScore,
          score: currentScore + newScore.scoreTurn,
        };
        return redis.getGameTurnNumber(gameId);
      })
      .then( (turnNumber) => {
        newScore = {
          ...newScore,
          turnNumber,
        }
        redis.setUserScore(gameId, authUser.username, JSON.stringify(newScore));
      })
      
    } else {
      redis.getUserScore(gameId, authUser.username)
      .then( (userScore) => {
        let jsonUserScore = JSON.parse(userScore);
        newScore = {
          ...jsonUserScore, 
          ...newScore,
          scoreTurn: 0, 
          rank: 0,
        };
       return redis.getGameTurnNumber(gameId);
      })
      .then( (turnNumber) => {
        newScore = {
          ...newScore,
          turnNumber
        }
        redis.setUserScore(gameId, authUser.username, JSON.stringify(newScore));
      })
    }

  });

});


http.listen(5000, () => {
  console.log('listening on *:5000');
});