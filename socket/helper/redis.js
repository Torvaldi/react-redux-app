
function getTurnNumber(gameId){
    return `turnNumber:${gameId}`;
}

function currentStatus(gameId){
    return `status:${gameId}`;
}

function gameScore(gameId){
    return `score:${gameId}`;
}

function scoreCounter(gameid){
  return `scoreCounter:${gameid}`;
}

function getGame(gameId){
    return `game:${gameId}`;
}



module.exports = {
    getTurnNumber,
    currentStatus,
    gameScore,
    scoreCounter,
    getGame,
}