
class Turn {

    constructor (players)
    {
        this.players = new Map();

        for (const [key, player] of players.entries())
        {
            let playerStat = {
                rank: 0,
                username: player.getUsername(),
                score: 0,
                lastAnswer: player.getLastAnswer()
            }
            this.players.set(player.getUsername(), playerStat)
        }

        this.getAllPlayers = this.getAllPlayers.bind(this);
        this.getPlayer = this.getPlayer.bind(this);
        this.serialize = this.serialize.bind(this);
        this.updatePlayerScore = this.updatePlayerScore.bind(this);
    }

    getAllPlayers(){
       return this.players;
    }

    getPlayer(username){
        if(this.players.has(username) === null){
            return null;
        }
        return this.players.get(username);
    }

    serialize(){
        const players = [];
        for (const [key, player] of this.players.entries())
        {
            players.push(player);
        }

        return players;
    }

    updatePlayerScore(username){
        let player = this.players.get(username);

        if(player === null){
            return;
        }


    }

}

module.exports = Turn;
