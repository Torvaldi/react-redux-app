const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis');

const event = require('./event');
const score = require('./helper/score');


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

  socket.on(event.JOIN_GAME, () => {
    socket.broadcast.emit(event.JOIN_GAME);
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
    socket.to('game:' + game.id).emit(event.USER_POST_CHAT, message);
  });



});

    

http.listen(5000, () => {
  console.log('listening on *:5000');
});