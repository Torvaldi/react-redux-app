
/**
 * Represent a player with its global score
 */
class Player {

    constructor (userName)
    {
        this.userName = userName;
        this.score = 0;
        this.rank = 0;
    }

    /**
     * @return {string}
     */
    getUsername = () => {
        return this.userName;
    }

    /**
     * update the score 
     * @param {*int} score
     * @return {void}
     */
    updateScore = (score) => {
        this.score += score;
    }

    /**
     * @return {int}
     */
    getScore = () => {
        return this.score;
    }

    /**
     * @param {*int} rank 
     * @return {void}
     */
    setRank = (rank) => {
        this.rank = rank
    }

    /**
     * transform Player object member to json object
     * @return {object}
     */
    serialize = () => {
        return {
            userName: this.userName,
            score: this.score,
            rank: this.rank
        };
    }
}

module.exports = Player;