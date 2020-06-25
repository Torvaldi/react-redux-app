const config = require('./../config.json');
const fetch = require('node-fetch');

const API_GAME_UPDATE_STATUS = config.api_url + "api/game.status";
const API_GET_ANIMES = config.api_url + "api/anime.index";
const API_USER_SAVE_SCORE = config.api_url + "api/game.user.save";


// TODO : prevent duplicate with client side
const getAuthorizationHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'token': token,
    }
}

async function updateGameStatus(token, gameId, statusId){
    let response = await fetch(API_GAME_UPDATE_STATUS, {
        method: 'PUT',
        headers: getAuthorizationHeader(token),
        body: JSON.stringify({
            'id': gameId, 
            'status' : statusId
        }),
    });
    let statusCode = await response.status;

    return statusCode;
}

async function getAnimes(token, level, musicType){
    let response = await fetch(API_GET_ANIMES + '?level=' + level + '&musicType=' + musicType, {
        method: 'GET',
        headers: getAuthorizationHeader(token),
      });
    let data = await response.json()
    
    return data;
  }


function savePlayerScore(token, players, gameId)
{
    fetch(API_USER_SAVE_SCORE, {
        method: 'PUT',
        headers: getAuthorizationHeader(token),
        body: JSON.stringify({
            'gameId': gameId, 
            'players' : players,
        }),
    });
}

module.exports = {
    updateGameStatus,
    getAnimes,
    savePlayerScore,
}