import { SECRET_KEY } from '../config';

const jwtJsDecode = require('jwt-js-decode');

/**
 * @param {*string} token 
 * @return bool
 */
export async function tokenVerify(token){
    let response = await jwtJsDecode.jwtVerify(token, SECRET_KEY);
    return response;
}

export const getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

export const tokenDecode = (token) => {
    return jwtJsDecode.jwtDecode(token);
}

