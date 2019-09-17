// API ENDPOINT

import config from './../config.json';

export const API_LOGIN = config.api_url + 'api/login';
export const API_REGISTER = config.api_url + 'api/register';
export const API_LOAD_GAME_BY_STATUS = config.api_url + 'api/game.index.status';
export const API_USER_JOIN_GAME = config.api_url + 'api/game.store.join';
export const API_USER_RUNNING_GAME = config.api_url + 'api/game.index.running';
export const API_NEW_GAME = config.api_url + 'api/game.store';


export const API_USER_GAME = config.api_url + 'api/game.user.show';
export const API_GAME = config.api_url + 'api/game.show';
export const API_GAME_UPDATE_STATUS = config.api_url + "api/game.status";
export const API_GET_ANIMES = config.api_url + "api/anime.index";
export const API_USER_LEAVE = config.api_url + "api/game.user.leave";



// API header
export const getAuthorizationHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
    }
}

export const getCrosHeader = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}

