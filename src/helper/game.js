const GAME_BY_PAGE = 5;

/**
 * TESTED
 * retrived game status text
 * @param {*int} statusId 
 */
export const getGameStatus = (statusId) => {
    if(statusId === 1){
        return "Waiting for player";
    }

    if(statusId === 2){
        return "Running";
    }

    if(statusId === 3){
        return "Finish";
    }

}

/**
 * TESTED
 * @param {*object} data
 * @return {*array} paginated data
 */
export const pagination = (data) => {

    let length = data.length;

    // get max page the given data can have
    let maxPage = Math.floor(length/GAME_BY_PAGE);
    // total of remaning data at the end of the array
    let remaning = length % GAME_BY_PAGE;
    
    // add data into separete array of GAME_BY_PAGE size
    let result = [];
    let start = 0;
    for (var i = 0; i < maxPage; i++) {
        result.push(data.slice(start, GAME_BY_PAGE));
        start+=GAME_BY_PAGE;
    }

    // push remaning data at the end of the array
    result.push(data.slice(-remaning));
    
    return result
}

/**
 * TESTED
 * get data used to print the paginate input componenant
 * @param {*object} data to paginate
 * @return {*int} current, current page
 * @return {*int} max, max Page
 * @return {*int} left, previous page (left button)
 * @return {*int} right, next page (right button)
 */
export const getPaginationInputData = (data) => {
    // get maxPage and currentPage and be sure there are of integer type
    let maxPage = parseInt(getMaxPage(data));
    let currentPage = parseInt(getCurrentPage(data));

    // avoid to set a page that does not exist
    let left = currentPage - 1;
    if(left < 0){
        left = 0
    }

    let right = currentPage + 1;
    if(right > maxPage){
        right = maxPage;
    }

    return {
        current: currentPage, 
        max: maxPage, 
        left, 
        right 
    }
}

/**
 * HALF TESTED with getPaginationInputData() : use get(page) argument, can't be fully tested
 * @param {*object} data 
 * @return {*int} number of the current page
 */
export const getCurrentPage = (data) => {
    let urlString = window.location.href; // current url
    let url = new URL(urlString);
    let page = url.searchParams.get("page");

    if(page == null){
        return 0;
    }

    let maxPage = getMaxPage(data);

    if(page > maxPage){
        return maxPage;
    }

    return page;
}

/**
 * TESTED
 * get max page the given data can have
 * @param {*object} data 
 */
export const getMaxPage = (data) => {
    let length = data.length;
    return  Math.floor(length/GAME_BY_PAGE);
}