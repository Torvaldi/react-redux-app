import { API_LOGIN, API_REGISTER, getCrosHeader } from './../../helper/api';

export const UPDATE_FIELD_USERNAME = 'UPDATE_FIELD_USERNAME';
export const UPDATE_FIELD_PASSWORD = 'UPDATE_FIELD_PASSWORD';
export const UPDATE_FIELD_PASSWORD_CONFIRM = 'UPDATE_FIELD_PASSWORD_CONFIRM';
export const UPDATE_FIELD_MAIL = 'UPDATE_FIELD_MAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE= 'REGISTER_FAILURE';
export const RESET_ERROR_REGISTER = 'RESET_ERROR_REGISTER';
export const RESET_ERROR_LOGIN = 'RESET_ERROR_LOGIN';
export const RESET_SUCESS_REGISTER = 'RESET_SUCESS_REGISTER';


// LOGIN and REGISTER_SUCCESS action
export const login = (data) => {

  return function(dispatch){
    dispatch({
      type: LOGIN_REQUEST
    });
    
    fetch(API_LOGIN, {
        method: 'POST',
        headers: getCrosHeader(),
        body: JSON.stringify({
          'username': data.username, 
          'password' : data.password
        }),
    })
    .then(response => response.json())
    .then(result => {

      if(result.error){
        dispatch({
          type: LOGIN_FAILURE,
          payload: { error: result.error }
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: result
        })
      }

      })
    .catch(error => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error : "An undefined error occured" }
      });
    });
   
  }

};

export const register = (data) => {

  return function(dispatch){
    dispatch({
      type: REGISTER_REQUEST
    });

    
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
  .then(result => {

      if(result.error){
        dispatch({
          type: REGISTER_FAILURE,
          payload: {error: result.error },
        })

      } else {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: result,
        })
      }

    })
    .catch(error => {
      dispatch({
        type: REGISTER_FAILURE,
        payload: { error : "An undefined error occured" },
      })
    });
    

  }

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