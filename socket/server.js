const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const event = require('./socketEvent.json');

const ioHelper = require('./helper/io');
const statusHelper = require('./helper/status');

const api = require('./helper/api');

const Game = require('./classes/Game.js');

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
    const { game, authUser, token } = data;

    socket.join(ioHelper.getRoom(game.id));

    // Check if this is a new game, otherwise create it
    // using given game parameters
    if (currentGames.has(game.id) === false) {
      currentGames.set(game.id, new Game(game.id, game.creator, game.level, game.answer, game.score_to_win, token));
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
  });

  /**
   * Chat
   */
  socket.on(event.USER_POST_CHAT, (data) => {
    const { player, message, gameId } = data;
    socket.to(ioHelper.getRoom(gameId)).emit(event.USER_POST_CHAT, {player, message});
  });

  /**
   * Event call when the game is launch
   */
  socket.on(event.LAUCH_GAME, (data) => {
    console.log('game launch');
    const { gameId, token } = data;

    io.in(ioHelper.getRoom(gameId)).emit(event.LAUCH_GAME);

    let currentGame = currentGames.get(gameId);

    // set new game status
    currentGame.setGameStatusLoading();

    // update game database status
    api.updateDatabaseGameStatus(token, gameId, 2);

    // sending all users that a new game has been updated (for the game list page)
    io.emit(event.GAME_UPDATE);
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
        let animes = currentGame.getLastTurn().getAnimeSerialize();

        // send change status event
        io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_0_TO_1, { animes });
  
      }, timeout);

    }
  });

  /**
   * Change status from music playing to score
  /**
   * @param data, contain the gameId and the runningStatus of this game
   * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
   */
  socket.on(event.CHANGE_STATUS_1_TO_2, (data) => {
    const { gameId } = data;

    // get currentGame
    let currentGame = currentGames.get(gameId);
    let timeout = statusHelper.getTimeout(1);

    // execute the following actions in x seconds
    setTimeout( () => {
        let currentStatus = currentGame.getGameStatus();
        if(currentStatus === statusHelper.gameStatus.musicPLaying){
          // Update game status
          currentGame.setGameGameStatusResult();

          // get turn scores
          let turnResult = currentGame.getLastTurn().serialize();

          // update players scores
          currentGame.updatePlayerScore();
          // update players rank
          currentGame.updatePlayerRank();

          // get players
          let players = currentGame.getAllPlayers();

          // send turn scores to the clients
          io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_1_TO_2, {turnResult, players});
        }

      }, timeout);
  });

  /**
     * @param data, contain the gameId and the runningStatus of this game
     * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
    */
  socket.on(event.CHANGE_STATUS_2_TO_0, (data) => {

    const { gameId, token } = data;
    let currentGame = currentGames.get(gameId);

    // check if there is a winner
    let winners = currentGame.checkWinner();
    if(winners.length > 0){
      // send winners to the players
      io.in(ioHelper.getRoom(gameId)).emit(event.GAME_FINISH, { winners });

      // set game status to finish
      api.updateDatabaseGameStatus(token, gameId, 3); 

      // save all players score to the server
      api.savePlayerScore(token, currentGame.getAllPlayers(), gameId);
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

  });

  /**
   * Event called when a user leave the game
   */
  socket.on(event.USER_LEAVE_GAME, (data) => {
    const { token, gameId, player } = data;

    // delete the user from game database
    api.userLeaveGameDatabase(token, gameId);

    // delete player in the game player list
    let currentGame = currentGames.get(gameId);

    currentGame.deletePlayer(player.username);

    // the user leaving the game is not the creator
    if(currentGame.getCreatorUsername() !== player.username){
      // send event to other player that the given player left the game
      socket.to(ioHelper.getRoom(gameId)).emit(event.USER_LEAVE_GAME, { player });

    // the user leaving the game is the creator
    } else {
      
      api.updateDatabaseGameStatus(token, gameId, 4); // set the game to cancel

      socket.to(ioHelper.getRoom(gameId)).emit(event.CREATOR_LEAVE_GAME);

      io.emit(event.GAME_UPDATE);
    }

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

    // update anime clicked
    turn.updatePlayerAnimeClicked(authUser.username, anime);
    // emit other players if the current player got the answer right or wrong
    socket.to(ioHelper.getRoom(gameId)).emit(event.CLICK_ANSWER, {authUser});

    turn.incrementeTotalAnswers();


    // if all players have given an answer
    if(turn.haveAllPlayerAnswer() === true){
      // fash pass to the second next round

      // Update game status
      currentGame.setGameGameStatusResult();

      // get turn scores
      let turnResult = currentGame.getLastTurn().serialize();

      // update players scores
      currentGame.updatePlayerScore();
      // update players rank
      currentGame.updatePlayerRank();

      // get players
      let players = currentGame.getAllPlayers();

      // send turn scores to the clients
      io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_1_TO_2, {turnResult, players});
    }

  });

  

});


http.listen(5000, () => {
  console.log('listening on *:5000');
});