
const Player = require('./Player');
const Turn = require('./Turn');

const gameStatus = {
    waiting: "waiting",
    loading: "loading",
    musicPLaying: "music playing",
    result: "result",
    finish: "finish"
};

class Game {

    constructor (id, creatorUserName, difficultyLevel, answersCount)
    {
        this.playerExists = this.playerExists.bind(this);
        this.newPlayer = this.newPlayer.bind(this);
        this.getPlayer = this.getPlayer.bind(this);
        this.getAllPlayers = this.getAllPlayers.bind(this);

        this.id = id;
        this.creatorUserName = creatorUserName;
        this.difficultyLevel = difficultyLevel;
        this.answersCount = answersCount;
        this.status = gameStatus.waiting;
        this.players = new Map();
        this.players.set(creatorUserName, new Player(creatorUserName));
        this.turns = new Map();
        //this.turns.set(1, new Turn(this.players));
    }

    playerExists(userName){
        if (this.players.has(userName)) {
            return true;
        }
        return false;
    }

    newPlayer(userName){
        if (this.playerExists(userName) === true) {
            return null;
        }
        this.players.set(userName, new Player(userName));
        return this.players.get(userName);
    }

    getPlayer(userName){
        if (this.playerExists(userName) === true) {
            return this.players.get(userName);
        }
        return null;
    }

    getAllPlayers(){
        let players = [];
        this.players.forEach(function(player){
            players.push(player.serialize());
        });
        
        return players;
    }

    updatePlayerScore(){
        // loop players
        let lastTurnPlayer = this.getLastTurn().getAllPlayers();
        
        for (const [key, player] of this.players.entries())
        {
            let playerTurn = lastTurnPlayer.get(player.userName);
            player.updateScore(playerTurn.score);
            
        }

    }

    createNewTurn(){
        let totalTurn = this.turns.size;
        let newTurn = totalTurn + 1;
        this.turns.set(newTurn, new Turn(this.players))
    }

    getLastTurn(){
        let lastTurnNumber = this.turns.size;
        let lastTurn = this.turns.get(lastTurnNumber);
        return lastTurn;
    }


    setGameStatusLoading(){
        this.status = gameStatus.loading;
    }

    setGameStatusMusicPLaying(){
        this.status = gameStatus.musicPLaying;
    }

    setGameGameStatusResult(){
        this.status = gameStatus.result;
    }



}

module.exports = Game;