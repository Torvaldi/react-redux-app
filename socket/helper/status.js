
const waitingTrun = require('./../waitingTurn.json');

function getTimeMilisecond(time){
    return time*1000;
}

/**
 * get second to wait between each round
 * @param {*} runningStatus 
 */
function getTimeout(runningStatus){
    if(runningStatus === 0){
        return getTimeMilisecond(waitingTrun.WAITING_TURN_1);
    }

    if(runningStatus === 1){
        return getTimeMilisecond(waitingTrun.WAITING_TURN_2);
    }

    return getTimeMilisecond(waitingTrun.WAITING_TURN_3);
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

const gameStatus = {
    waiting: "waiting",
    loading: "loading",
    musicPLaying: "music playing",
    result: "result",
    finish: "finish"
};

module.exports = {
    getTimeout,
    getNextStatus,
    gameStatus,
}