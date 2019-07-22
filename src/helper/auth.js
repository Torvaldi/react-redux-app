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

/**
 * @param {*string} cookie ex : "username=falia"
 * @return {*string}
 * Split string after the = 
 * Separate function so its easier to test as we have to set a cookie
 */
export const splitCookie = (value, name) => {
    var parts = value.split("; " + name + "=");
    if (parts.length === 2){
        return parts.pop().split(";").shift();
    }
    return null;
}

export const getCookie = (name) => {
    var value = "; " + document.cookie;
    return splitCookie(value, name);
}

export const tokenDecode = (token) => {
    return jwtJsDecode.jwtDecode(token);
}

