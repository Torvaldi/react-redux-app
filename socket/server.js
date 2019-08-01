const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis');

const event = require('./event');
const score = require('./helper/score');
const status = require('./helper/status');


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
    client.hget(score.gameScore(game.id), authUser.id, (error,response) => {
      // if user doesn't have a score, initial it to zero
      
      if(response === null){
        console.log('game null')
        client.hset(score.gameScore(game.id), authUser.id, 0);
      }
      // get all user score and send it back to client
      client.hgetall(score.gameScore(game.id), (error, scores) => {
        io.in('game:'+ game.id).emit(event.USER_JOIN_GAME, scores);
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
      io.in(`game:${gameId}`).emit(event.SWITCH_RUNNING_STATUS);
    }, status.getTimeout(runningStatus));

  });



  /**
   * Event called when a user choose an answer, in order to increment their score or not
   * and tell other player when another payer answer 
   */
  socket.on(event.CLICK_ANSWER, (data) => {
    const { gameId, authUser, findAnime } = data;
    //let responseData = { authUser, findAnime };
    
    // incremente score if findAnime is true (guess anime right)
    if(findAnime === true){
      client.hget(score.gameScore(gameId), authUser.id, (error, userScore) => {
        let newScore = parseInt(userScore) + 1; // because redis store string only
        client.hset(score.gameScore(gameId), authUser.id, newScore);
      });
    }

    // send to if x was right or wrong
    //socket.to(`game:${gameId}`).emit(event.CLICK_ANSWER, responseData);
  });
  

});


http.listen(5000, () => {
  console.log('listening on *:5000');
});