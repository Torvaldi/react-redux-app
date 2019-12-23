
/**
 * Source : https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
 * @param {} animes 
 * @param {*} answers 
 */
export function getAnimeToGuess(animes, answers){
    // Shuffle array
    const shuffled = animes.sort(() => 0.5 - Math.random());

    // Get sub-array of first n (here answers) elements after shuffled
    let selected = shuffled.slice(0, answers);
    
    let animeToGuess = selected[Math.floor(Math.random()*selected.length)];
    let animeOpening = animeToGuess.openings;
    let openingToGuess = animeOpening[Math.floor(Math.random()*animeOpening.length)]

    return {
        animes: selected,
        animeToGuess,
        openingToGuess,
    }
}


