
class Player {

    constructor (userName)
    {
        this.userName = userName;
        this.score = 0;
        this.lastAnswer = null;

        this.serialize = this.serialize.bind(this);
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