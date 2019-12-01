
class Player {

    constructor (userName)
    {
        this.userName = userName;
        this.score = 0;
        this.lastAnswer = null;

        this.serialize = this.serialize.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.getLastAnswer = this.getLastAnswer.bind(this);
        this.updateScore = this.updateScore.bind(this);
    }

    getUsername(){
        return this.userName;
    }

    getLastAnswer(){
        return this.lastAnswer;
    }

    updateScore(score){
        this.score += score;
    }

    serialize(){
        return {
            userName: this.userName,
            score: this.score,
            lastAnswer: this.lastAnswer
        };
    }
}

module.exports = Player;