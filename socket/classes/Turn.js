
class Turn {

    constructor (players)
    {
        this.scores = new Map();
        for (let player of players)
        {
            this.scores.set(player.userName, 0);
        }
    }
}

module.exports = Turn;