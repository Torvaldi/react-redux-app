import { API_USER_RUNNING_GAME, getAuthorizationHeader } from '../helper/api';

export const GET_GAME = 'GET_GAME';
export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';
export const SET_ALL_PLAYERS = 'SET_ALL_PLAYERS';
export const GET_WINNERS = 'GET_WINNERS';
export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const REMOVE_PLAYER =  'REMOVE_PLAYER';

/**
 * get game data (level, answer etc)
 * @param {*function} dispatch 
 * @param {*string} token 
 */
export function getGame(dispatch, token) {
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

export function updateStatusState(gameStatus) {
  return {
    type: UPDATE_GAME_STATUS,
    payload: gameStatus
  };
}

export function setPlayers(players) {
  return {
    type: SET_ALL_PLAYERS,
    payload: players
  };
}

export function addPlayer(player) {
  return {
    type: ADD_NEW_PLAYER,
    payload: player
  };
}

export function setWinners(winners) {
  return {
    type: GET_WINNERS,
    payload: winners,
  };
}

export function removePlayer(player){
  return {
    type: REMOVE_PLAYER,
    payload: player,
  }
}