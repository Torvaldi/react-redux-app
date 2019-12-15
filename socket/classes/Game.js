
const Player = require('./Player');
const Turn = require('./Turn');

const statusHelper = require('../helper/status');
const gameStatus = statusHelper.gameStatus;

class Game {

    constructor (id, creatorUserName, difficultyLevel, answersCount, winningScore)
    {
        this.playerExists = this.playerExists.bind(this);
        this.newPlayer = this.newPlayer.bind(this);
        this.getPlayer = this.getPlayer.bind(this);
        this.getAllPlayers = this.getAllPlayers.bind(this);
        this.getGameStatus =  this.getGameStatus.bind(this);
        this.checkWinner = this.checkWinner.bind(this);

        this.id = id;
        this.creatorUserName = creatorUserName;
        this.difficultyLevel = difficultyLevel;
        this.answersCount = answersCount;
        this.winningScore = winningScore;
        this.status = gameStatus.waiting;
        this.players = new Map();
        this.players.set(creatorUserName, new Player(creatorUserName));
        this.turns = new Map();
    }

    /**
     * verify if a player exist based on it username
     * @param {*string} userName
     * @return {*bool}
     */
    playerExists(userName){
        if (this.players.has(userName)) {
            return true;
        }
        return false;
    }

    /**
     * create a new Player in the game
     * @param {*string} userName
     * @return {Player}
     */
    newPlayer(userName){
        if (this.playerExists(userName) === true) {
            return null;
        }
        this.players.set(userName, new Player(userName));
        return this.players.get(userName);
    }

    /**
     * retrive a player based on the given username parameter
     * @param {string} userName
     * @return {Player|null}
     */
    getPlayer(userName){
        if (this.playerExists(userName) === true) {
            return this.players.get(userName);
        }
        return null;
    }

    /**
     * Retrive all players of the game
     * @return {array} array of serialized Player
     */
    getAllPlayers(){
        let players = [];
        this.players.forEach(function(player){
            players.push(player.serialize());
        });
        
        return players;
    }

    /**
     * update all players scores
     * retrives the score of the turn of each player and add it to their global score
     * @return {void}
     */
    updatePlayerScore(){
        // loop players
        let lastTurnScore = this.getLastTurn().getScores();
        
        for (const [key, player] of this.players.entries())
        {
            let playerTurn = lastTurnScore.get(player.userName);
            player.updateScore(playerTurn.score);
            
        }

    }

    /**
     * initialise a new Turn inside the game
     * @return {void}
     */
    createNewTurn(){
        // get total turn number
        let totalTurn = this.turns.size;
        // initialise the next turn number
        let newTurn = totalTurn + 1;
        // set new Turn to the game object
        this.turns.set(newTurn, new Turn(this.players))
    }

    /**
     * Retrive the current last turn of the game
     * Note : depending of when this method is run, the last turn is also the current turn
     * @return {Turn}
     */
    getLastTurn(){
        let lastTurnNumber = this.turns.size;
        let lastTurn = this.turns.get(lastTurnNumber);
        return lastTurn;
    }

    /**
     * @return {string}
     */
    getGameStatus()
    {
        return this.status;
    }

    /**
     * @return {void}
     */
    setGameStatusLoading(){
        this.status = gameStatus.loading;
    }

    /**
     * @return {void}
     */
    setGameStatusMusicPLaying(){
        this.status = gameStatus.musicPLaying;
    }

    /**
     * @return {void}
     */
    setGameGameStatusResult(){
        this.status = gameStatus.result;
    }

    /**
     * Retrives the initial Running game status
     * @return {int}
     */
    getRunningStatus()
    {
        if(this.status === gameStatus.musicPLaying){
            return 1;
        }

        if(this.status === gameStatus.result){
            return 2;
        }

        return 0;
    }

    /**
     * retrives the winner of the game
     * @return {array}
     */
    checkWinner(){
        let scores = this.getAllPlayers();
        let winners = [];
        let winnerPlayer = { username: null, score: 0 }

        scores.forEach( (player) => {
            // compare player score to the winning score and the current player bigger score
            if(player.score >= this.winningScore && player.score >= winnerPlayer.score){
                // set the player as the current winner
                winnerPlayer = player;
                // add to the array of winners
                winners.push(player);
            }
        });
  
        return winners;
    }

}

module.exports = Game;