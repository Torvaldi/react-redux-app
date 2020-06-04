const config = require('./../config.json');
const fetch = require('node-fetch');

const API_GAME_UPDATE_STATUS = config.api_url + "api/game.status";
const API_USER_LEAVE = config.api_url + "api/game.user.leave";
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

function updateDatabaseGameStatus(token, gameId, statusId){
    fetch(API_GAME_UPDATE_STATUS, {
        method: 'PUT',
        headers: getAuthorizationHeader(token),
        body: JSON.stringify({
            'id': gameId, 
            'status' : statusId
        }),
    });
}

function userLeaveGameDatabase(token, gameId){
    fetch(API_USER_LEAVE, {
        method: 'DELETE',
        headers: getAuthorizationHeader(token),
        body: JSON.stringify({
            'game_id': gameId
        })
    });
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
    updateDatabaseGameStatus,
    userLeaveGameDatabase,
    getAnimes,
    savePlayerScore,
}