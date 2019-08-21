
/**
 * 
 * @param {*} runningStatus 
 */
function getTimeout(runningStatus){
    if(runningStatus === 0){
        return 5000;
    }

    if(runningStatus === 1){
        return 30000
    }

    return 15000;
}

function currentStatus(gameId){
    return `status:${gameId}`;
}


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
    currentStatus,
}