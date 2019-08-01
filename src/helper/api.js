// API ENDPOINT

import { API_URL } from '../config';

export const API_LOGIN = API_URL + 'api/login';
export const API_REGISTER = API_URL + 'api/register';
export const API_LOAD_GAME_BY_STATUS = API_URL + 'api/game.index.status';
export const API_USER_JOIN_GAME = API_URL + 'api/game.store.join';
export const API_USER_RUNNING_GAME = API_URL + 'api/game.index.running';
export const API_NEW_GAME = API_URL + 'api/game.store';


export const API_USER_GAME = API_URL + 'api/game.user.show';
export const API_GAME = API_URL + 'api/game.show';
export const API_GAME_UPDATE_STATUS = API_URL + "api/game.status";
export const API_GET_ANIMES = API_URL + "api/anime.index";

// API header
export const getAuthorizationHeader = (token) => {
    return {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers' : "content-type, access-control-allow-origin, access-control-allow-credentials, access-control-allow-headers, access-control-allow-methods, Authorization",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
    }
}

export const getCrosHeader = () => {
    return {
        'Access-Control-Allow-Origin':'*',
        'mode': 'no-cors',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, DELETE, PUT',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}