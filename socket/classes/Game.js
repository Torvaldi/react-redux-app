
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
        this.id = id;
        this.creatorUserName = creatorUserName;
        this.difficultyLevel = difficultyLevel;
        this.answersCount = answersCount;
        this.status = gameStatus.wt;
        this.players = new Map();
        this.players.set(creatorUserName, new Player(creatorUserName));
        this.turns = new Map();
        this.turns.set(1, new Turn());
    }

    playerExists = (userName) => {
        if (this.players.has(userName)) {
            return true;
        }
        return false;
    }

    newPlayer = (userName) => {
        if (this.playerExists(userName) === true) {
            return null;
        }
        this.players.set(userName, new Player(userName));
        return this.players[userName];
    }

    getPlayer = (userName) => {
        if (this.playerExists(userName) === true) {
            return this.players[userName];
        }
        return null;
    }

    getTotalScores = () => {
        let totalScores = {};
        for (let player of this.players)
        {
            totalScores[player.userName] = player.score;
        }
        return totalScores;
    }
}

module.exports = Game;