const api = require('../helper/api');
const Game = require('./Game');

class CurrentGames {

    constructor ()
    {
        this.games = [];
        this.get = this.get.bind(this);
    }

    set = (game, token) => {
        this.games.push(new Game(game.id, game.creator, game.level, game.answer, game.score_to_win, game.musicType, token));
    }

    async get(id){
        // get first game with the id given as parameter
        let game = this.games.find((game) => game.id === id);

        // if the game is set, return it
        if(game !== undefined) return game;
        console.log(this);

        // if its not set, try to fetch it from the api
        let gameResponse = await api.getGame(id);
        // TODO tester error

        this.set(gameResponse, token); // TODO token

        return this.get(id);
    }

    has = (id) => {
        let game = this.games.find((game) => game.id === id);

        if(game === undefined){
            return false;
        }

        return true;
    }


}

module.exports = CurrentGames;