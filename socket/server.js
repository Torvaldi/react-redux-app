const app = require('express')();
const fs = require('fs');
const config = require('./config.json');
var http;
if(config.prod === true){
  let options = {
      key: fs.readFileSync('/etc/letsencrypt/live/socket.guesstheanimeopening.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/socket.guesstheanimeopening.com/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/socket.guesstheanimeopening.com/chain.pem')
  };
  http = require('https').createServer(options, app);
} else {
  http = require('http').createServer(app);
}

const io = require('socket.io')(http);
const event = require('./socketEvent.json');

const ioHelper = require('./helper/io');
const statusHelper = require('./helper/status');
const api = require('./helper/api');

let currentGames = new Map();

let Game = require('./classes/Game');

io.on('connection', (socket) => {

  // GAME SELECTION
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
      currentGames.set(game.id, new Game(game.id, game.creator, game.level, game.answer, game.score_to_win, game.musicType, token));
    }

    let currentGame = currentGames.get(game.id);

    // retrives the game status and send it to the player
    let gameStatus = currentGame.getRunningStatus();
    socket.emit(event.UPDATE_GAME_STATUS, {status: gameStatus});

    // Check if this player already existed in this game
    let player;
    if (currentGame.playerExists(authUser.username) === true) {
      player = currentGame.getPlayer(authUser.username);
    } else { // Otherwise create it
      player = currentGame.newPlayer(authUser.username);
    }

    // Notify the new player that they successfully
    // joined the game and send him all the players with their scores
    socket.emit(event.GAME_JOINED_SUCCESSFULLY, currentGame.getAllPlayers());

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
    const { gameId, token } = data;

    io.in(ioHelper.getRoom(gameId)).emit(event.LAUCH_GAME);

    let currentGame = currentGames.get(gameId);

    currentGame.setGameStatusLoading();

    // update game database status to "playing"
    api.updateGameStatus(token, gameId, 2);

    // sending all users that a new game has been updated (for the game list page)
    io.emit(event.GAME_UPDATE);
  });

  /**
   * Change status from waiting time to music playing
   */
  socket.on(event.CHANGE_STATUS_0_TO_1, (data) => {

    const { gameId } = data;

    let currentGame = currentGames.get(gameId);

    // prevent from sending the event if the game status is not the expected one
    if(currentGame.getGameStatus() !== statusHelper.gameStatus.loading) return;

    let timeout = statusHelper.getTimeout(0);

    // execute the following actions in x seconds
    setTimeout( () => {

      // prevent from sending the event if the game status is not the expected one (it might have change since the previous check)
      if(currentGame.getGameStatus() !== statusHelper.gameStatus.loading) return;

      currentGame.setGameStatusMusicPLaying();

      currentGame.createNewTurn();

      // receipe anime that'll be play the next turn
      let animes = currentGame.getLastTurn().getAnimeSerialize();

      // send change status event
      io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_0_TO_1, { animes });

    }, timeout);

  });

  /**
   * Change status from music playing to score
  /**
   * @param data, contain the gameId and the runningStatus of this game
   * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
   */
  socket.on(event.CHANGE_STATUS_1_TO_2, (data) => {
    const { gameId } = data;
    
    let currentGame = currentGames.get(gameId);

    // prevent from sending the event if the game status is not the expected one
    if(currentGame.getGameStatus() !== statusHelper.gameStatus.musicPLaying) return;

    let timeout = statusHelper.getTimeout(1);

    let isFastPassBeforeTimeout = currentGame.getLastTurn().getFastPassAnswer();

    let turnNumberBeforeTimeout = currentGame.getTurnNumber();

    // execute the following actions in x seconds
    setTimeout( () => {

        // prevent from sending the event if the game status is not the expected one (it might have change since the previous check)
        if(currentGame.getGameStatus() !== statusHelper.gameStatus.musicPLaying) return;

        let isFastPassAfterTimeout = currentGame.getLastTurn().getFastPassAnswer();
        let turnNumberAfterTimeout = currentGame.getTurnNumber();

        if(isFastPassAfterTimeout !== isFastPassBeforeTimeout || turnNumberAfterTimeout !== turnNumberBeforeTimeout) return;

        currentGame.setGameGameStatusResult();
        currentGame.updatePlayerScore();
        currentGame.updatePlayerRank();

        let turnResult = currentGame.getLastTurn().serialize();

        let players = currentGame.getAllPlayers();

        // send turn scores to the clients
        io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_1_TO_2, {turnResult, players});

      }, timeout);
  });

  /**
     * @param data, contain the gameId and the runningStatus of this game
     * send back the switch event in (5, 15 or 30) seconds, depending of the runningStatus
    */
  socket.on(event.CHANGE_STATUS_2_TO_0, (data) => {

    const { gameId, token } = data;

    let currentGame = currentGames.get(gameId);

    // prevent from sending the event if the game status is not the expected one
    if(currentGame.getGameStatus() !== statusHelper.gameStatus.result) return;

    // check if there is a winner
    let winners = currentGame.checkWinner();
    if(winners.length > 0){

      let animes = currentGame.getLastTurn().getAnimeSerialize();

      // send winners to the players
      io.in(ioHelper.getRoom(gameId)).emit(event.GAME_FINISH, { winners, animes });

      // set game status to finish
      api.updateGameStatus(token, gameId, 3);

      // save all players score to the server
      api.savePlayerScore(token, currentGame.getAllPlayers(), gameId);

      // TODO 2 make statistic ?

      // TODO delete game of current game object
    }

    let isFastPassBeforeTimeout = currentGame.getLastTurn().getFastPassResult();

    let turnNumberBeforeTimeout = currentGame.getTurnNumber();

    let timeout = statusHelper.getTimeout(2);
    setTimeout(() => {

      // prevent from sending the event if the game status is not the expected one (it might have change since the previous check)
      if(currentGame.getGameStatus() !== statusHelper.gameStatus.result) return;

      let isFastPassAfterTimeout = currentGame.getLastTurn().getFastPassResult();
      let turnNumberAfterTimeout = currentGame.getTurnNumber();

      if(isFastPassBeforeTimeout !== isFastPassAfterTimeout || turnNumberAfterTimeout !== turnNumberBeforeTimeout) return;

      currentGame.setGameStatusLoading();
      
      io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_2_TO_0, {});
    }, timeout);

  });

  /**
   * Event called when a user leave the game
   */
  socket.on(event.USER_LEAVE_GAME, (data) => {

    const { token, gameId, player } = data;

    // delete player in the game player list
    let currentGame = currentGames.get(gameId);

    currentGame.deletePlayer(player.username);

    // the user leaving the game is not the creator
    if(currentGame.getCreatorUsername() !== player.username){
      // send event to other player that the given player left the game
      socket.to(ioHelper.getRoom(gameId)).emit(event.USER_LEAVE_GAME, { player });

    // the user leaving the game is the creator
    } else {

      api.updateGameStatus(token, gameId, 4)
      .then( (statusCode) => {

        if(statusCode !== 200) return; // check if the request sucessed

        socket.to(ioHelper.getRoom(gameId)).emit(event.CREATOR_LEAVE_GAME); // set the game to cancel
        io.emit(event.GAME_UPDATE);
      });

    }

    // make user leave the room
    socket.leave(ioHelper.getRoom(gameId));

  });

  socket.on(event.CREATOR_LEAVE_GAME, (gameId) => {
    socket.leave(ioHelper.getRoom(gameId));
  })

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

      let turn = currentGame.getLastTurn();

      turn.setFastPassAnswer(true);

      // get turn scores
      let turnResult = turn.serialize();

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

  socket.on(event.VOTE_NEXT_SONG, (data) => {
    const { gameId, username } = data;

    let currentGame = currentGames.get(gameId);
    let turn = currentGame.getLastTurn();

    turn.updatePlayerNextSongRequest(username);
    turn.setFastPassResult(true);

    let turnResult = turn.serialize();

    io.in(ioHelper.getRoom(gameId)).emit(event.UPDATE_TURN, {turnResult} );

    // if all players have request the next song, change game status
    if(turn.haveAllPlayerRequestNextSong() === true) {
      currentGame.setGameStatusLoading();
      io.in(ioHelper.getRoom(gameId)).emit(event.CHANGE_STATUS_2_TO_0, {});
    }


  });


});


http.listen(config.port, () => {
  console.log('listening on *:'+ config.port);
});
