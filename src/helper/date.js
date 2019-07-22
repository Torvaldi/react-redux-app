
// https://momentjs.com/timezone/
import moment from 'moment';
import 'moment-timezone';
// CANT BE TESTED: as it used timezone and current date information

/**
 * Genere text based on the creation date of the game
 * @param {*int} timestamp 
 */
export const getGamelistDateText = (timestamp) => {
    let minutes = getDifferenceCurrentDate(timestamp);

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
 * @param {*string} timestamp 
 * @return {*int} minutes
 */
const getDifferenceCurrentDate = (timestamp) => {
    // get current date and given date with auth user timezone
    let date = getDateTime(timestamp);
    let now = getDateTimeWithTimezone(new Date());

    let differenceInSecond = parseInt((now-date)/1000);

    // get result into minutes and second, remove number after dot
    let minutes = Math.floor(differenceInSecond / 60);

    return minutes;
}

/**
 * get datetime with auth user timezone
 * @param {*string} timestamp 
 */
const getDateTime = (timestamp) => {
    let dateTime = new Date(timestamp);
    return getDateTimeWithTimezone(dateTime);
}

/**
 * Set datime to user timezone
 * Source: https://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript
 * @param {Datetime} date
 * @return {Datetime}
 */
const getDateTimeWithTimezone = (date) => {
    return moment.tz(date, "America/New_York", getUserTimezone());
}

/**
 * get auth user timezone
 * @return {*string} timezone, ex Europe/Paris
 */
const getUserTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

