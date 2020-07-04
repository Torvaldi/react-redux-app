
/**
 * Represent a player with its global score
 */
class Player {

    constructor (userName)
    {
        this.userName = userName;
        this.score = 0;
        this.rank = 0;

        this.serialize = this.serialize.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.getScore = this.getScore.bind(this);
        this.setRank = this.setRank.bind(this);
    }

    /**
     * @return {string}
     */
    getUsername(){
        return this.userName;
    }

    /**
     * update the score 
     * @param {*int} score
     * @return {void}
     */
    updateScore(score){
        this.score += score;
    }

    /**
     * @return {int}
     */
    getScore(){
        return this.score;
    }

    /**
     * @param {*int} rank 
     * @return {void}
     */
    setRank(rank){
        this.rank = rank
    }

    /**
     * transform Player object member to json object
     * @return {object}
     */
    serialize(){
        return {
            userName: this.userName,
            score: this.score,
            rank: this.rank
        };
    }
}

module.exports = Player;