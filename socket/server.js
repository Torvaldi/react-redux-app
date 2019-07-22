const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const NEW_GAME = 'NEW_GAME';
const JOIN_GAME = 'JOIN_GAME';

io.on('connection', (socket) => {
  
 socket.on(NEW_GAME, () => {
    socket.broadcast.emit(NEW_GAME);
  });

  socket.on(JOIN_GAME, () => {
    socket.broadcast.emit(JOIN_GAME);
  });


  
});

http.listen(5000, () => {
  console.log('listening on *:5000');
});