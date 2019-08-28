

/**
 * get second to wait between each round
 * @param {*} runningStatus 
 */
function getTimeout(runningStatus){
    if(runningStatus === 0){
        return 5000;
    }

    if(runningStatus === 1){
        return 10000
    }

    return 10000;
}

/**
 * get the next status of the game, determined by the current status
 * @param {*} status 
 */
function getNextStatus(status){;
    if(status === 0){
        return 1;
    } else if(status === 1) {
        return 2;
    } else {
        return 0;
    }
}

module.exports = {
    getTimeout,
    getNextStatus,
}