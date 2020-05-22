
const scoreHelper = require('../helper/score');
const AnimeTurn = require('./AnimeTurn');

/**
 * Represent a turn during a game
 * This class manage 
 * _all players score turn
 * _update player score
 */
class Turn {

    constructor (players, animes, anwserCount)
    {
        // bind all methods
        this.getScores = this.getScores.bind(this);
        this.getPlayerScore = this.getPlayerScore.bind(this);
        this.serialize = this.serialize.bind(this);
        this.updatePlayerScore = this.updatePlayerScore.bind(this);
        this.setRank = this.setRank.bind(this);
        this.getRank = this.getRank.bind(this);
        this.setAnime =  this.setAnime.bind(this)
        this.setPlayerTotal = this.setPlayerTotal.bind(this);
        this.getTotalPlayer = this.getTotalPlayer.bind(this);
        this.setTotalAnswers = this.setTotalAnswers.bind(this);
        this.getTotalAnswer = this.getTotalAnswer.bind(this);
        this.incrementeTotalAnswers = this.incrementeTotalAnswers.bind(this);
        this.haveAllPlayerAnswer = this.haveAllPlayerAnswer.bind(this);

        // Initialise the score of the turn for each player
        this.scores = new Map();
        for (const [key, player] of players.entries())
        {
            let playerScore = {
                rank: null,
                username: player.getUsername(),
                score: 0,
                lastAnswer: null
            }
            this.scores.set(player.getUsername(), playerScore)
        }

        // initialise rank to 1
        this.setRank(1);

        // initialise animes of the turn
        this.setAnime(new AnimeTurn(animes, anwserCount));

        // initialise the total of player for this turn
        this.setPlayerTotal(players.size);

        // initialise the number of answer given, start with 0
        this.setTotalAnswers(0);

    }

    /**
     * set the total of player in the turn
     * @param {*int} playerTotal 
     */
    setPlayerTotal(playerTotal)
    {
        this.playerTotal = playerTotal;
    }

    /**
     * @return {int}
     */
    getTotalPlayer()
    {
        return this.playerTotal;
    }

    /**
     * @param {int}
     */
    setTotalAnswers(totalAnswer){
        this.totalAnswer = totalAnswer;
    }

    /**
     * @return {int}
     */
    getTotalAnswer()
    {
        return this.totalAnswer;
    }

    /**
     * @return {void}
     */
    incrementeTotalAnswers()
    {
        this.setTotalAnswers(this.totalAnswer + 1);
    }

    /**
     * @param {*Anime} anime
     * @return {void}
     */
    setAnime(anime)
    {
        this.anime = anime;
    }

    getAnimeSerialize(){
        return this.anime.serialize();
    }

    /**
     * @return {Map}
     */
    getScores(){
       return this.scores;
    }

    /**
     * @param {*int} rank
     * @return {void}
     */
    setRank(rank)
    {
        this.rank = rank;
    }
    /**
     * @return {int}
     */
    getRank()
    {
        return this.rank;
    }

    /**
     * @param {*string} username 
     */
    getPlayerScore(username){
        if(this.scores.has(username) === null){
            return null;
        }
        return this.scores.get(username);
    }

    /**
     * @return {bool}
     */
    haveAllPlayerAnswer(){
        return this.getTotalPlayer() === this.getTotalAnswer();
    }

    /**
     * update score of the given player username
     * @param {*string} username
     * @return {void}
     */
    updatePlayerScore(username){
        if(this.scores.has(username) === null){
            return;
        }
        // get current ranking
        let rank = this.getRank();

        // genere player score based on they rank
        let score = scoreHelper.genereScore(rank);

        // set new rank
        this.setRank(rank + 1);

        // retrive previous score
        let playerScore = this.scores.get(username);

        // update new score data
        this.scores.set(username, {...playerScore, score, rank});
    }

    /**
     * update lastAnswer of the given player username
     * @param {*string} username 
     * @param {*object} anime
     * @return {void}
     */
    updatePlayerAnimeClicked(username, anime){

        // verify if the username key exist in the score map
        if(this.scores.has(username) === null){
            return;
        }

        // get turn score of the given username
        let playerScore = this.scores.get(username);

        // retrive anime name in japanese and english
        let animeNames = {
            nameUs: anime.nameUs,
            nameJap: anime.nameJap
        }

        // update player last answer
        this.scores.set(username, {...playerScore, lastAnswer: animeNames});
    }


    /**
     * transform score Map member to json object 
     * @return {object}
     */
    serialize(){
        const scores = [];
        for (const [key, score] of this.scores.entries())
        {
            scores.push(score);
        }

        scores.sort(function(a, b){
            
            if(b.rank < a.rank && b.rank != null && a.rank != null){
                return 1
            }

            return -1;
        
        });
        return scores;
    }

}

module.exports = Turn;
