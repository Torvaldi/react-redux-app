import { LOGIN } from '../constant/actions';
import { API_LOGIN } from '../constant/api';

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
