const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis');

const event = require('./event');
const scoreHelper = require('./helper/score');
const statusHelper = require('./helper/status');


// Create Redis Client
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to Redis !');
});

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
   * A user join the game
   * @param data contain the game the user join and the authentificated user data
   * Check if user has a score, initial its score if they haven't
   * Send back all user scores to the react client
   */
  socket.on(event.USER_JOIN_GAME, (data) => {
    // fetch player list (fetch api)
    const { game, authUser } = data;
    socket.join('game:' + game.id);

    // get user score
    client.hget(scoreHelper.gameScore(game.id), authUser.username, (error,response) => {
      // if user doesn't have a score, initial it to zero
      
      if(response === null){
        client.hset(scoreHelper.gameScore(game.id), authUser.username, 0);
      }
      // get all user score and send it back to client
      client.hgetall(scoreHelper.gameScore(game.id), (error, response) => {
        let objectResponse = scoreHelper.hashToJson(response);
        let responseData = { score: objectResponse };
        io.in('game:'+ game.id).emit(event.USER_JOIN_GAME, responseData);
      });
    });
  });

  socket.on(event.USER_POST_CHAT, (data) => {
    const { message, game } = data;
    socket.to(`game:${game.id}`).emit(event.USER_POST_CHAT, message);
  });

  /**
   * Event call when the game is launch
   */
  socket.on(event.LAUCH_GAME, (gameId) => {
    socket.to(`game:${gameId}`).emit(event.LAUCH_GAME);
    client.set(`scoreCounter:${gameId}`, 1);
    console.log('event lauch');
  });

  /**
   * event call by the creator of the game in order to send the animes to guess to the others players
   */
  socket.on(event.SEND_ANIME_TO_GUESS, (data) => {
    const { animeToGuess, gameId } = data;
    io.in(`game:${gameId}`).emit(event.SEND_ANIME_TO_GUESS, animeToGuess);
  });

  /**
   * @param data, contain the gameId and the runningStatus of this game
   * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
   */
  socket.on(event.SWITCH_RUNNING_STATUS, (data) => {
    const { gameId, runningStatus } = data;
    
    setTimeout( () => {
      let responseData = {};

      // the client need to recieve the score at the end of the turn
      if(runningStatus === 1){
        // get all players total score
        client.hgetall(scoreHelper.gameScore(gameId), (error, response) => {

          let objectResponse = scoreHelper.hashToJson(response);
          responseData = {...responseData, score: objectResponse };
          // get player rank of the turn
          io.in('game:'+ gameId).emit(event.SWITCH_RUNNING_STATUS, responseData);
        });

      }
      
      if(runningStatus === 2){
        // reset counter for next turn
        client.set(`scoreCounter:${gameId}`, 1);
        client.del(`scoreRank:${gameId}`);

        io.in(`game:${gameId}`).emit(event.SWITCH_RUNNING_STATUS, responseData);
      }
      
      if(runningStatus === 0){
        // nothing needs to be send back to the client, send empty object
        io.in(`game:${gameId}`).emit(event.SWITCH_RUNNING_STATUS, responseData);
      }
      
    }, statusHelper.getTimeout(runningStatus)); // get second of the timeout depeding of runningStatus

  });


  /**
   * Event called when a user choose an answer, in order to increment their score or not
   * and tell other player when another payer answer 
   */
  socket.on(event.CLICK_ANSWER, (data) => {
    const { gameId, authUser, findAnime } = data;
    
    // if the players guess right
    if(findAnime == true){
      // get player position
      client.get(`scoreCounter:${gameId}`, (error, counter) => {
        
        let rank = parseInt(counter);
        client.set(`scoreCounter:${gameId}`, rank + 1);

        let scoreTurn = scoreHelper.genereScore(rank);
        // incremente total score
        client.hget(scoreHelper.gameScore(gameId), authUser.username, (error, response) => {
          let result = JSON.parse(response);
          let currentScore = 0;
          if(result.score){
            currentScore = result.score;
          }

          let newData = {
            ...result, 
            username: authUser.username,
            score: currentScore + scoreTurn,
            scoreTurn,
            rank,
          };
          client.hset(scoreHelper.gameScore(gameId), authUser.username, JSON.stringify(newData));
        });
      });
      // player guess wrong
    } else {
      client.hget(scoreHelper.gameScore(gameId), authUser.username, (error, response) => {
        let result = JSON.parse(response);
        let newData = { 
          ...result, 
          scoreTurn: 0, 
          rank: 0, 
          username: authUser.username 
        };
        client.hset(scoreHelper.gameScore(gameId), authUser.username, JSON.stringify(newData));
      });
    }
  });

});


http.listen(5000, () => {
  console.log('listening on *:5000');
});