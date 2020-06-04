import { API_LOGIN, API_REGISTER, getCrosHeader } from '../helper/api';

export const UPDATE_FIELD_USERNAME = 'UPDATE_FIELD_USERNAME';
export const UPDATE_FIELD_PASSWORD = 'UPDATE_FIELD_PASSWORD';
export const UPDATE_FIELD_PASSWORD_CONFIRM = 'UPDATE_FIELD_PASSWORD_CONFIRM';
export const UPDATE_FIELD_MAIL = 'UPDATE_FIELD_MAIL';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const RESET_ERROR_LOGIN = 'RESET_ERROR_LOGIN';
export const RESET_ERROR_REGISTER = 'RESET_ERROR_REGISTER';
export const RESET_SUCESS_REGISTER = 'RESET_SUCESS_REGISTER';


// LOGIN and REGISTER action
export const login = (dispatch, data) => {
    fetch(API_LOGIN, {
        method: 'POST',
        headers: getCrosHeader(),
        body: JSON.stringify({
          'username': data.username, 
          'password' : data.password
        }),
    })
    .then(response => response.json())
    .then(result =>
        dispatch({
          type: LOGIN,
          payload: result
        })
      );
};

export const register = (dispatch, data) => {
  fetch(API_REGISTER, {
    method: 'POST',
    headers: getCrosHeader(),
    body: JSON.stringify({
      'username': data.username,
      'email': data.mail,
      'password' : data.password,
      'password_confirmation': data.passwordConfirmation
    }),
})
.then(response => response.json())
.then(result =>
    dispatch({
      type: REGISTER,
      payload: result,
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

export function changePasswordConfirm(passwordConfirmation){
  return {
    type: UPDATE_FIELD_PASSWORD_CONFIRM,
    payload: { passwordConfirmation }
  }
}

export function changeMail(mail){
  return {
    type: UPDATE_FIELD_MAIL,
    payload : { mail }
  }
}


export function resetErrorLogin(){
  return {
    type: RESET_ERROR_LOGIN,
    payload: {
      errorLogin: undefined,
    }
  }
}

export function resetSucessRegister(){
  return {
    type: RESET_SUCESS_REGISTER,
    payload: {
      messageRegister: undefined,
    }
  }
}

export function resertErrorRegister(){
  return {
    type: RESET_ERROR_REGISTER,
    payload: {
      errorRegister: undefined,
    }
  }
}