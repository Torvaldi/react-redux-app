const config = require('./../../src/config.json');
const fetch = require('node-fetch');

const API_GAME_UPDATE_STATUS = config.api_url + "api/game.status";

// TODO : prevent duplicate with client side
const getAuthorizationHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
    }
}

function updateDatabaseGameStatus(token, gameId, statusId){
    fetch(API_GAME_UPDATE_STATUS, {
        method: 'POST',
        headers: getAuthorizationHeader(token),
        body: JSON.stringify({
            'id': gameId, 
            'status' : statusId
        }),
    });
}

module.exports = {
    updateDatabaseGameStatus,
}