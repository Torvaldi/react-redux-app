
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

module.exports = {
    getTimeout,
}