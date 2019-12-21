const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const event = require('./../src/socketEvent.json');
//const redis = require('./redisClient')

const ioHelper = require('./helper/io');
const statusHelper = require('./helper/status');
const scoreHelper = require('./helper/score');

const api = require('./helper/api');

const Game = require('./classes/Game.js');
const Player = require('./classes/Player.js');
const Answer = require('./classes/Answer.js');

let currentGames = new Map();

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
   * A user join the game, keep in mind that they can join a game already running
   * if they were already in the game before
   * @param data contain the game the user join and the authentificated user data
   * Check if user has a score, initialize its score if they haven't
   * Send back all user scores to the react client
   */
  socket.on(event.USER_JOIN_GAME, (data) => {
    // fetch player list (fetch api)
    const { game, authUser } = data;

    socket.join(ioHelper.getRoom(game.id));

    // Check if this is a new game, otherwise create it
    // using given game parameters
    if (currentGames.has(game.id) === false) {
      currentGames.set(game.id, new Game(game.id, game.creator, game.level, game.answer, game.score_to_win));
    }

    let player;
    // Check if this player already existed in this game
    if (currentGames.get(game.id).playerExists(authUser.username) === true) {
      player = currentGames.get(game.id).getPlayer(authUser.username);

      // retrives the game status and send it to the player
      let gameStatus = currentGames.get(game.id).getRunningStatus();
      if(gameStatus != 0){ // does not send it if its 0 because the default value on the client is 0
        socket.emit(event.UPDATE_GAME_STATUS, {status: gameStatus});
      }
    }
    // Otherwise create it
    else {
      player = currentGames.get(game.id).newPlayer(authUser.username);
    }


    // Notify the new player that they successfully
    // joined the game and send him all the players with their scores
    socket.emit(event.GAME_JOINED_SUCCESSFULLY, currentGames.get(game.id).getAllPlayers());

    // Send notification to other players that a new player joined
    // as well as he's score
    socket.to(ioHelper.getRoom(game.id)).emit(event.USER_JOIN_GAME, player.serialize());

    /*
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
    */
  });

  socket.on(event.USER_POST_CHAT, (data) => {
    const { player, message, gameId } = data;
    socket.to(ioHelper.getRoom(gameId)).emit(event.USER_POST_CHAT, {player, message});
  });

  /**
   * Event call when the game is launch
   */
  socket.on(event.LAUCH_GAME, (data) => {

    const { gameId, token } = data;

    io.in(ioHelper.getRoom(gameId)).emit(event.LAUCH_GAME);

    let currentGame = currentGames.get(gameId);

    // set new game status
    currentGame.setGameStatusLoading();

    // update game database status
    api.updateDatabaseGameStatus(token, gameId, 2);

    // sending all users that a new game has been updated (for the game list page)
    io.emit(event.GAME_UPDATE);


    //initialise score counter
    //redis.setScoreCounter(gameId, 1);
    // initialise status
    //redis.setGameStatus(gameId, 0);
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

    let currentGame = currentGames.get(gameId);

    let timeout = statusHelper.getTimeout(0);

    let currentStatus = currentGame.getGameStatus();
    if(currentStatus === statusHelper.gameStatus.loading){

      // execute the following actions in x seconds
      setTimeout( () => {
        // update game status
        currentGame.setGameStatusMusicPLaying();
  
        // update number of the turn
        currentGame.createNewTurn();
  
        // send change status event
        io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_0_TO_1, {});
  
      }, timeout);

    }


    /*
      redis.getGameStatus(gameId).then( (gameStatus) => {

        if(gameStatus == 0){

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
              io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_0_TO_1, {});
            })
      
          }, timeout);
        }
      

      });
    */
  });

  /**
   * Change status from music pl
  /**
   * @param data, contain the gameId and the runningStatus of this game
   * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
   */
  socket.on(event.CHANGE_STATUS_1_TO_2, (data) => {
    const { gameId } = data;

    // get currentGame
    let currentGame = currentGames.get(gameId);
    let timeout = statusHelper.getTimeout(1);

    let currentStatus = currentGame.getGameStatus();
    if(currentStatus === statusHelper.gameStatus.musicPLaying){
      // execute the following actions in x seconds
      setTimeout( () => {
        // Update game status
        currentGame.setGameGameStatusResult();

        // get turn scores
        let turnResult = currentGame.getLastTurn().serialize();

        // update players scores
        currentGame.updatePlayerScore();

        // get players
        let players = currentGame.getAllPlayers();

        // send turn scores to the clients
        io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_1_TO_2, {turnResult, players});

      }, timeout);
    }


    /*
    redis.getGameStatus(gameId).then((gameStatus) => {
      if (gameStatus == 1) {

        let timeout = statusHelper.getTimeout(1)
        setTimeout(() => {
          redis.setGameStatus(gameId, 2);

          let data = {};
          redis.getAllUserScore(gameId)
            .then((usersScores) => {

              data = {
                ...data,
                usersScores,
              }
              return redis.getGameTurnNumber(gameId);
            })
            .then((turnNumber) => {
              let scoreJson = scoreHelper.hashToJson(data.usersScores, turnNumber);
              let response = { score: scoreJson };

              io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_1_TO_2, response);
            });
        }, timeout);
      }
    });
    */
  });

  /**
     * @param data, contain the gameId and the runningStatus of this game
     * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
    */
  socket.on(event.CHANGE_STATUS_2_TO_0, (data) => {

    const { gameId } = data;
    let currentGame = currentGames.get(gameId);

    // check if there is a winner
    let winners = currentGame.checkWinner();
    if(winners.length > 0){
      io.in(ioHelper.getRoom(gameId)).emit(event.GAME_FINISH, { winners }); // send winners to the players
      api.updateDatabaseGameStatus(token, gameId, 3); // set game status to finish
    }

    let timeout = statusHelper.getTimeout(2);

    let currentStatus = currentGame.getGameStatus();
    if(currentStatus === statusHelper.gameStatus.result){
      setTimeout(() => {
        // Update game status
        currentGame.setGameStatusLoading();

        io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_2_TO_0, {});
      }, timeout);  
    }

    /*
        redis.getGameStatus(gameId).then((gameStatus) => {
    
          if (gameStatus == 2) {
            let timeout = statusHelper.getTimeout(2)
            setTimeout(() => {
              redis.setGameStatus(gameId, 0);
    
              redis.setScoreCounter(gameId, 1);
              io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_2_TO_0, {});
    
            }, timeout);
    
          }
        });
        */
  });

  /**
   * Event called when a user leave the game
   */
  socket.on(event.USER_LEAVE_GAME, (data)=> {
    const { token, gameId, player } = data;

    // delete the user from game database
    api.userLeaveGameDatabase(token, gameId);

    let currentGame = currentGames.get(gameId);

    currentGame.deletePlayer(player.username);

    socket.to(ioHelper.getRoom(gameId)).emit(event.USER_LEAVE_GAME, { player });

  });

  /**
   * Event called when a user choose an answer, in order to increment their score or not
   * and tell other player when another payer answer 
   */
  socket.on(event.CLICK_ANSWER, (data) => {
    const { gameId, authUser, findAnime, anime } = data;
    
    let currentGame = currentGames.get(gameId);

    let turn = currentGame.getLastTurn();

    if(findAnime === true){
      // update player score of the turn
      turn.updatePlayerScore(authUser.username);
    }

    turn.updatePlayerAnimeClicked(authUser.username, anime);
    
    // update anime clicked

    // emit other players if the current player got the answer right or wrong
    socket.to(ioHelper.getRoom(gameId)).emit(event.CLICK_ANSWER, {authUser});



    /*
    let newScore = {
      username: authUser.username,
      anime,
    };

    socket.broadcast.emit(event.CLICK_ANSWER, {
      authUser, findAnime
    });
    // if the user has right or wrong
    if (findAnime === true) {
      /*
      redis.getScoreCounter(gameId)
        .then((scoreCounter) => {
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
        .then((userScore) => {
          let jsonUserScore = JSON.parse(userScore);

          // get previous score, set it to 0 by default if the player doesn't have any 
          let currentScore = 0;
          if (jsonUserScore.score) {
            currentScore = jsonUserScore.score;
          }

          newScore = {
            ...jsonUserScore,
            ...newScore,
            score: currentScore + newScore.scoreTurn,
          };
          return redis.getGameTurnNumber(gameId);
        })
        .then((turnNumber) => {
          newScore = {
            ...newScore,
            turnNumber,
          }
          redis.setUserScore(gameId, authUser.username, JSON.stringify(newScore));
        })
        

    } else {
      
      redis.getUserScore(gameId, authUser.username)
        .then((userScore) => {
          let jsonUserScore = JSON.parse(userScore);
          newScore = {
            ...jsonUserScore,
            ...newScore,
            scoreTurn: 0,
            rank: 0,
          };
          return redis.getGameTurnNumber(gameId);
        })
        .then((turnNumber) => {
          newScore = {
            ...newScore,
            turnNumber
          }
          redis.setUserScore(gameId, authUser.username, JSON.stringify(newScore));
        })
        
    }
    */

  });

  

});


http.listen(5000, () => {
  console.log('listening on *:5000');
});