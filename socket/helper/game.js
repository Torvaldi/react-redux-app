

function getGame(gameId){
    return `game:${gameId}`;
}

function getTurnNumber(gameId){
    return `turnNumber:${gameId}`;
}

module.exports = {
    getGame,
    getTurnNumber,
}