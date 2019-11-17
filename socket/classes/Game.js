
const Player = require('./Player');
const Turn = require('./Turn');

const gameStatus = {
    wt: "waiting",
    ld: "loading",
    mp: "music playing",
    res: "result",
    end: "finish"
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
        this.status = gameStatus.wt;
        this.players = new Map();
        this.players.set(creatorUserName, new Player(creatorUserName));
        this.turns = new Map();
        this.turns.set(1, new Turn(this.players));
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
}

module.exports = Game;