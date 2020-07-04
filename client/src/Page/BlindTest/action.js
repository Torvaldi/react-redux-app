import { API_USER_RUNNING_GAME, API_USER_LEAVE, getAuthorizationHeader } from 'helper/api';

export const GET_GAME = 'GET_GAME';
export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';
export const SET_ALL_PLAYERS = 'SET_ALL_PLAYERS';
export const GET_WINNERS = 'GET_WINNERS';
export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const REMOVE_PLAYER =  'REMOVE_PLAYER';
export const CLEAR_GAME = 'CLEAR_GAME';
export const USER_LEAVE_REQUEST = 'USER_LEAVE_REQUEST';
export const USER_LEAVE_SUCCESS = 'USER_LEAVE_SUCCESS';
export const USER_LEAVE_FAILURE = 'USER_LEAVE_FAILURE';
export const SET_LAST_ANIME_PLAYED = 'SET_LAST_ANIME_PLAYED';

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

/**
 * when a user leave the game, remove them from de database
 * @param {*} token 
 * @param {*} gameId 
 */
export function removeUserFromGame(token, gameId){

  return function(dispatch){
    dispatch({
      type: USER_LEAVE_REQUEST
    });

    fetch(API_USER_LEAVE, {
        method: 'DELETE',
        headers: getAuthorizationHeader(token),
        body: JSON.stringify({
            'game_id': gameId
        })
    })
    .then(response => response.json())
    .then(result => 
      dispatch({
        type: USER_LEAVE_SUCCESS,
      })
    )
    .catch(error => 
      dispatch({
        type: USER_LEAVE_FAILURE
      })
    );
      

  }

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

export function clearGame(){
  return {
    type: CLEAR_GAME
  }
}


export function setLastAnimePlayed(animes){
  return {
    type: SET_LAST_ANIME_PLAYED,
    payload : {
      animeToGuess : animes.animeToGuess,
      openingToGuess: animes.openingToGuess
    }

  }
}
