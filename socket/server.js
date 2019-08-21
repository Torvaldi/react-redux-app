const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis');

const event = require('./event');
const scoreHelper = require('./helper/score');
const statusHelper = require('./helper/status');
const gameHelper = require ('./helper/game');


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
   * A user join the game, keep in mind that they can join a game already running if there were already in the game before
   * @param data contain the game the user join and the authentificated user data
   * Check if user has a score, initial its score if they haven't
   * Send back all user scores to the react client
   */
  socket.on(event.USER_JOIN_GAME, (data) => {
    // fetch player list (fetch api)
    const { game, authUser } = data;
    socket.join(gameHelper.getGame(game.id));

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
        io.in(gameHelper.getGame(game.id)).emit(event.USER_JOIN_GAME, responseData);
      });

      // if the game is already running, the player might have press f5 ou alt+f4 and join during the game
     if(parseInt(game.status) === 2){
       // send game status to the players, just to be sure enveryone is on the same page
       client.get(statusHelper.currentStatus(game.id), (error, status) => {
         if(status){
           io.in(gameHelper.getGame(game.id)).emit(event.SWITCH_RUNNING_STATUS, { status: parseInt(status) });
         }
       });
     }


    });
  });

  socket.on(event.USER_POST_CHAT, (data) => {
    const { message, game } = data;
    socket.to(gameHelper.getGame(game.id)).emit(event.USER_POST_CHAT, message);
  });

  /**
   * Event call when the game is launch
   */
  socket.on(event.LAUCH_GAME, (gameId) => {
    socket.to(gameHelper.getGame(gameId)).emit(event.LAUCH_GAME);
    //initialise score counter
    client.set(scoreHelper.scoreCounter(gameId), 1);
    console.log('event lauch');
  });

  /**
   * event call by the creator of the game in order to send the animes to guess to the others players
   */
  socket.on(event.SEND_ANIME_TO_GUESS, (data) => {
    const { animeToGuess, gameId } = data;
    io.in(gameHelper.getGame(gameId)).emit(event.SEND_ANIME_TO_GUESS, animeToGuess);
  });

  /**
   * @param data, contain the gameId and the runningStatus of this game
   * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
   */
  socket.on(event.SWITCH_RUNNING_STATUS, (data) => {
    const { gameId, runningStatus } = data;
    
    client.set(statusHelper.currentStatus(gameId), runningStatus);

    setTimeout( () => {
      // define the next status
      let nextStatus = statusHelper.getNextStatus(runningStatus);
      let responseData = { status: nextStatus };

      // the client need to recieve the score at the end of the turn
      if(runningStatus === 1){
        // get all players total score
        client.hgetall(scoreHelper.gameScore(gameId), (error, response) => {

          client.get(gameHelper.getTurnNumber(gameId), (error, turnNumber) => {

            // get all the scores
            let objectResponse = scoreHelper.hashToJson(response, turnNumber);

            // add scores to the response send back to the client
            responseData = {...responseData, score: objectResponse };

            io.in(gameHelper.getGame(gameId)).emit(event.SWITCH_RUNNING_STATUS, responseData);
          });
        });

      }
      
      if(runningStatus === 2){
        // reset counter for next turn
        client.set(scoreHelper.scoreCounter(gameId), 1);
        io.in(gameHelper.getGame(gameId)).emit(event.SWITCH_RUNNING_STATUS, responseData);
      }
      
      if(runningStatus === 0){
        // nothing needs to be send back to the client, send empty object
        
        // incremente number of the turn
        client.get(gameHelper.getTurnNumber(gameId), (error, turnNumber) => {
          let newTurnNumber = 0;
          if(turnNumber){
            newTurnNumber = parseInt(turnNumber) + 1;
          }
          client.set(gameHelper.getTurnNumber(gameId), newTurnNumber);
        });

        io.in(gameHelper.getGame(gameId)).emit(event.SWITCH_RUNNING_STATUS, responseData);
      }
      
    }, statusHelper.getTimeout(runningStatus)); // get second of the timeout depeding of runningStatus

  });


  /**
   * Event called when a user choose an answer, in order to increment their score or not
   * and tell other player when another payer answer 
   */
  socket.on(event.CLICK_ANSWER, (data) => {
    const { gameId, authUser, findAnime } = data;
    
    client.get(gameHelper.getTurnNumber(gameId), (error, turnNumber) => {

      // if the players guess right
      if(findAnime == true){
        // get player position
        client.get(scoreHelper.scoreCounter(gameId), (error, counter) => {
          
          let rank = parseInt(counter); // ranking of the player during the turn
          // incremente rank
          client.set(scoreHelper.scoreCounter(gameId), rank + 1);

          // get score of the turn depeding of the rank of the player
          let scoreTurn = scoreHelper.genereScore(rank);

          // incremente total score
          client.hget(scoreHelper.gameScore(gameId), authUser.username, (error, response) => {
            let result = JSON.parse(response);
            
            // get previous score, set it to 0 by default if the player doesn't have any 
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
              turnNumber,
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
            username: authUser.username,
            turnNumber,
          };
          client.hset(scoreHelper.gameScore(gameId), authUser.username, JSON.stringify(newData));
        });
      }

    });


  });

});


http.listen(5000, () => {
  console.log('listening on *:5000');
});