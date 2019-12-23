class AnimeTurn {

    constructor (animes, answers)
    {
        this.getAnimeAnswer = this.getAnimeAnswer.bind(this);
        this.getAnimeToGuess = this.getAnimeToGuess.bind(this);
        this.getOpeningToGuess = this.getOpeningToGuess.bind(this);

        this.setAnimesAnswer = this.setAnimesAnswer.bind(this);
        this.setAnimeToGuess = this.setAnimeToGuess.bind(this);
        this.setOpeningToGuess = this.setOpeningToGuess.bind(this);

        this.setAnimesAnswer(animes, answers);
        this.setAnimeToGuess();
        this.setOpeningToGuess();
    }

    setAnimesAnswer(animes, answers){
        // Shuffle array
        const shuffled = animes.sort(() => 0.5 - Math.random());

        // Get sub-array of first n (here answers) elements after shuffled
        let animesAnwers = shuffled.slice(0, answers);

        this.animesAnswer = animesAnwers;
    }

    setAnimeToGuess(){
        this.animeToGuess = this.animesAnswer[Math.floor(Math.random()*this.animesAnswer.length)];
    }

    setOpeningToGuess(){
        let animeOpening = this.getAnimeToGuess().openings;
        this.openingToGuess = animeOpening[Math.floor(Math.random()*animeOpening.length)];
    }

    getAnimeAnswer(){
        return this.animesAnswer;
    }

    getAnimeToGuess(){
        return this.animeToGuess;
    }

    getOpeningToGuess(){
        return this.openingToGuess;
    }

    serialize(){
        return {
            animes: this.getAnimeAnswer(),
            animeToGuess: this.getAnimeToGuess(),
            openingToGuess: this.getOpeningToGuess(),
        }
    }

}

module.exports = AnimeTurn;
