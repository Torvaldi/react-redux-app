
/**
 * Represent a player with its global score
 */
class Player {

    constructor (userName)
    {
        this.userName = userName;
        this.score = 0;

        this.serialize = this.serialize.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.updateScore = this.updateScore.bind(this);
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
     * @return {void}s
     */
    updateScore(score){
        this.score += score;
    }

    /**
     * transform Player object member to json object
     * @return {void}
     */
    serialize(){
        return {
            userName: this.userName,
            score: this.score
        };
    }
}

module.exports = Player;