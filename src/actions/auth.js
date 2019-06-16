import { LOGIN } from './actions';
import { API_LOGIN } from '../helper/api';

export const login = (dispatch, data) => {
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
