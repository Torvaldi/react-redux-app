import { API_USER_GAME, API_USER_RUNNING_GAME, getAuthorizationHeader } from '../helper/api';

export const GET_GAME = 'GET_GAME';

/**
 * get game data (level, answer etc)
 * @param {*function} dispatch 
 * @param {*string} token 
 */
export function getGame(dispatch, token){
  fetch(API_USER_RUNNING_GAME, {
      method: 'GET',
      headers: getAuthorizationHeader(token),
    })
    .then(response => response.json())
    .then(result => 
      dispatch({
        type: GET_GAME,
        payload: result
      })
    );
}
