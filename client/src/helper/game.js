const GAME_BY_PAGE = 5;

/**
 * TESTED
 * retrived game status text
 * @param {*int} statusId 
 */
export const getGameStatus = (statusId) => {
    statusId = parseInt(statusId);

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
    let i;
    for (i = 0; i < maxPage; i++) {
        let dataSlice = data.slice(start, start + GAME_BY_PAGE);
        start += GAME_BY_PAGE;
        result.push(dataSlice);
    }

    // push remaning data at the end of the array
    if(remaning > 0){
        result.push(data.slice(-remaning));
    }

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
    let maxPage = parseInt(getMaxPage(data)) - 1;
    let currentPage = parseInt(getCurrentPage(data));

    // avoid to set a page that does not exist
    let left = currentPage - 1;
    if(left < 0){
        left = 0
    }

    let right = currentPage + 1;
    if(right >= maxPage){
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

    if(page >= maxPage){
        return maxPage -1;
    }

    if(page < 0){
        return 0;
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
    return Math.ceil(length/GAME_BY_PAGE);
}


/**
 * @return {array}
 */
export const getMusicTypeOptions = () => {
     // array use to print music type values on the create form and on the game list visual
     return [
        {
            value: 1,
            label: 'Opening and Ending',
            shortValue : "OP/ED"
        },
        {
            value: 2,
            label: 'Opening',
            shortValue : "OP"
        },
        {
          value: 3,
          label: 'Ending',
          shortValue : "ED"
        }
    ];
}

/**
 * @param {int} givenType 
 * @return {string}
 */
export const getMusicTypeByValue = (givenType) => {
    let musicTypeArray = getMusicTypeOptions().find((type) => type.value === givenType);
    
    if(musicTypeArray === undefined) return 'N/A';

    return musicTypeArray.shortValue;
}


export const getLevelOptions = () => {
    return [
        {
            value: 1,
            label: "Easy",
        },
        {
            value: 2,
            label: "Normal",
        },
        {
            value: 3,
            label: "Hard"
        }
    ];
}

/**
 * @param {int} givenType 
 * @return {string}
 */
export const getLevelByValue = (givenLevel) => {
    let levelArray = getLevelOptions().find((type) => type.value === givenLevel);
    
    if(levelArray === undefined) return 'N/A';

    return levelArray.label;
}
