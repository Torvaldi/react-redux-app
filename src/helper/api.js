// API ENDPOINT

import { API_URL } from '../config';

export const API_LOGIN = API_URL + 'api/login';
export const API_REGISTER = API_URL + 'api/register';
export const API_LOAD_GAME_BY_STATUS = API_URL + 'api/game.index.status';
export const API_USER_JOIN_GAME = API_URL + 'api/game.store.join';
export const API_USER_RUNNING_GAME = API_URL + 'api/game.index.running';

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