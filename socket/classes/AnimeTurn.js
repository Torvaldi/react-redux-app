/**
 * This class manage the random selection of the opening played each turn
 */
class AnimeTurn {

    constructor (animes, answers)
    {
        this.setAnimesAnswer(animes, answers);
        this.setAnimeToGuess();
        this.setOpeningToGuess();
    }

    /**
     * Select x animes from the anime object with x = answers variable
     * The results will be the anime proposed as an anwser during the turn
     * @param {*object} animes 
     * @param {*int} answers
     * @return {void}
     */
    setAnimesAnswer = (animes, answers) => {
        // Shuffle array
        const shuffled = animes.sort(() => 0.5 - Math.random());

        // Get sub-array of first n (here answers) elements after shuffled
        let animesAnwers = shuffled.slice(0, answers);

         // order answer by name
        animesAnwers.sort((a, b) => (a.name_jap > b.name_jap) ? 1 : -1);

        this.animesAnswer = animesAnwers;
    }

    /**
     * randomly select one anime amoung the answer that will be the right answer
     * @return {void}
     */
    setAnimeToGuess = () => {
        this.animeToGuess = this.animesAnswer[Math.floor(Math.random()*this.animesAnswer.length)];
    }

    /**
     * randomly select one opening among all the opening of the anime right answer
     * This opening wil be the one played during the turn
     * @return {void}
     */
    setOpeningToGuess = () => {
        let animeOpening = this.getAnimeToGuess().opening;
        this.openingToGuess = animeOpening[Math.floor(Math.random()*animeOpening.length)];
    }

    /**
     * @return {object} the answer displayed during the turn
     */
    getAnimeAnswer = () => {
        return this.animesAnswer;
    }

    /**
     * @return {object}, the anime info of the opening played during the turn
     */
    getAnimeToGuess = () => {
        return this.animeToGuess;
    }

    /**
     * @return {object} the opening played during the turn
     */
    getOpeningToGuess = () => {
        return this.openingToGuess;
    }

    /**
     * return an object with all the informations necessary during a turn
     * @return {object}
     */
    serialize = () => {
        return {
            animes: this.getAnimeAnswer(),
            animeToGuess: this.getAnimeToGuess(),
            openingToGuess: this.getOpeningToGuess(),
        }
    }

}

module.exports = AnimeTurn;
