import config from '../config.json';

const jwtJsDecode = require('jwt-js-decode');
/**
 * @param {*string} token 
 * @return bool
 */
export async function tokenVerify(token){
    let response = await jwtJsDecode.jwtVerify(token, config.secret_key);
    return response;
}

/**
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

export const logOut = () => {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
}

/**
 * check if user is log in
 * @return {bool}
 */
export async function isLogIn() {
    let token = getCookie('token');

    if(token === null || token.length === 0 || token === '""'){
      return false;
    }

    const tokenValid = await tokenVerify(token);

    return tokenValid;
}