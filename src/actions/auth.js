import { API_LOGIN } from '../helper/api';

export const UPDATE_FIELD_USERNAME = 'UPDATE_FIELD_USERNAME';
export const UPDATE_FIELD_PASSWORD = 'UPDATE_FIELD_PASSWORD';
export const LOGIN = 'LOGIN';
export const RESET_ERROR = 'RESET_ERROR';

export const login = (dispatch, data) => {
  console.log('login')
    fetch(API_LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          'username': data.username, 
          'password' : data.password}),
    })
    .then(response => response.json())
    .then(result =>
        dispatch({
          type: LOGIN,
          payload: result
        })
      );
};

export function changeUsername(username){
  return {
    type: UPDATE_FIELD_USERNAME,
    payload: { username }
  }
}

export function changePassword(password){
  return {
    type: UPDATE_FIELD_PASSWORD,
    payload: { password }
  }
}

export function resetError(){
  return {
    type: RESET_ERROR,
    payload: {
      error: undefined,
    }
  }
}

