import { API_USER_RUNNING_GAME, getAuthorizationHeader } from '../helper/api';

export const GET_GAME = 'GET_GAME';
export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';
export const GET_SCORE = 'GET_SCORE';
export const GET_WINNERS = 'GET_WINNERS';

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

export function updateStatusState(gameStatus){
  return {
    type: UPDATE_GAME_STATUS,
    payload: gameStatus
  }
}

export function playerRefreshScore(scores){
  return {
    type: GET_SCORE,
    payload: scores
  }
}

export function setWinners(winners){
  return {
    type: GET_WINNERS,
    payload: winners,
  }
}

