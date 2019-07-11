
// https://momentjs.com/timezone/
import moment from 'moment';
import 'moment-timezone';

/**
 * get difference between given date and the curent date
 * @param {*string} timestamp 
 * @return {*object} minutes and seconds
 */
export const getDifferenceCurrentDate = (timestamp) => {
    // get current date and given date with auth user timezone
    let date = getDateTime(timestamp);
    let now = getDateTimeWithTimezone(new Date());

    let differenceInSecond = parseInt((now-date)/1000);

    // get result into minutes and second, remove number after dot
    let minutes = Math.floor(differenceInSecond / 60);
    let seconds = differenceInSecond % 60;

    return {minutes, seconds};
}

/**
 * get datetime with auth user timezone
 * @param {*string} timestamp 
 */
export const getDateTime = (timestamp) => {
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

