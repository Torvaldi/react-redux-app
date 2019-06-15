import { LOGIN } from '../constant/actions';

export const login = (dispatch, data) => {
    fetch('http://localhost:8000/api/login', {
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
