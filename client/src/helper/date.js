
// CANT BE TESTED: as it used timezone and current date information

/**
 * Genere text based on the creation date of the game
 * @param {*int} timestamp 
 */
export const getGamelistDateText = (date) => {

    let minutes = getDifferenceCurrentDate(date);

    if(minutes === 0){
        return "Created less than a minute ago";
    }

    if(minutes === 1){
        return "Created 1 minute ago";
    }

    return "Created " + minutes + " minutes ago";
}

/**
 * get difference between given date and the curent date
 * @param {*string} timestamp utc format
 * @return {*int} minutes
 */
const getDifferenceCurrentDate = (date) => {
    // get given date and current date in second
    let timestamp = Math.floor(new Date(date).getTime() / 1000);
    let now = Math.floor(new Date().getTime() / 1000);

    // get utc offset of te current date in minutes
    let timezoneOffset = new Date().getTimezoneOffset();

    // get différence between the 2 date and add the utc offset (*60 to have it in second and not in minutes)
    let secondDifferent = (now - timestamp) + (timezoneOffset * 60);

    // convert second to minutes
    let minutes = Math.floor(secondDifferent / 60);

    return minutes;
}



