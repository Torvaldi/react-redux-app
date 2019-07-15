import { 
  API_LOAD_GAME_BY_STATUS, 
  API_USER_JOIN_GAME, 
  API_USER_RUNNING_GAME, 
  getAuthorizationHeader 
} from './../helper/api';

export const LOAD_AVALAIBLE_GAME = 'LOAD_AVALAIBLE_GAME';
export const CREATE_GAME = 'CREATE_GAME';
export const USER_JOIN_GAME = 'USER_JOIN_GAME';
export const USER_RUNNING_GAME = 'USER_RUNNING_GAME';

/**
 * get all game waiting for player
 * @param {function} dispatch 
 * @param {*string} token 
 */
export const getGameAvalaible = (dispatch, token) => {
    fetch(API_LOAD_GAME_BY_STATUS + '?id=1', {
        method: 'GET',
        headers: getAuthorizationHeader(token),
    })
    .then(response => response.json())
    .then(result =>
        dispatch({
          type: LOAD_AVALAIBLE_GAME,
          payload: result
        })
      );
};

/**
 * 
 * @param {function} dispatch 
 * @param {*object} data contain token and gameId
 */
export const userJoinGame = (dispatch, data) => {
  fetch(API_USER_JOIN_GAME, {
    method: 'POST',
    headers: getAuthorizationHeader(data.token),
    body: JSON.stringify({
      'game_id': data.gameId,
    })
  })
  .then(response => response.json())
  .then(result => 
    dispatch({
      type: USER_JOIN_GAME,
      payload: result
    })
  );
}

/**
 * User REjoin game action
 * it call USER_JOIN_GAME event as userJoinGame function but does not perform api call
 * This function is use in case a user close the window of the running game, so they can rejoin it again
 * @param {*int} gameId 
 */
export function userReJoinGame(gameId){
  return {
    type: USER_JOIN_GAME,
    payload: { gameId }
  }
}

/**
 * get the last (if there are any) running game the user has
 */
export const getUserRunningGame = (dispatch, token) => {
  fetch(API_USER_RUNNING_GAME, {
    method: 'GET',
    headers: getAuthorizationHeader(token),
  })
  .then(response => response.json())
  .then(result => 
    dispatch({
      type: USER_RUNNING_GAME,
      payload: result
    })
  );
}
