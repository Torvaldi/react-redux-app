
import { API_GET_ANIMES, getAuthorizationHeader } from '../helper/api';

export const GET_ANIMES = 'GET_ANIMES';
export const CHANGE_RUNNING_STATUS = 'CHANGE_RUNNING_STATUS';
export const SET_ANIME_TO_GUESS = 'SET_ANIME_TO_GUESS';
export const SET_ANIME_TO_GUESS_CALL = 'SET_ANIME_TO_GUESS_CALL';
export const SET_SCORE = 'SET_SCORE';
export const SET_TURN_RESULT = 'SET_TURN_RESULT';

export function getAnimes(dispatch, data){
    fetch(API_GET_ANIMES + '?level=' + data.level, {
        method: 'GET',
        headers: getAuthorizationHeader(data.token),
      })
      .then(response => response.json())
      .then(result => 
        dispatch({
          type: GET_ANIMES,
          payload: result
        })
      );
  }

export function switchRunningStatus(status){
  return {
    type: CHANGE_RUNNING_STATUS,
    payload: status,
  }
}


export function setAnimeToGuess(animeToGuess){
    return {
      type: SET_ANIME_TO_GUESS,
      payload: animeToGuess,
    }
}

export function setAnimeToGuessCall(bool){
  return {
    type: SET_ANIME_TO_GUESS_CALL,
    payload: bool,
  }
}

export function setScore(score){
  return {
    type: SET_SCORE,
    payload: score,
  }
}

export function setTurnResult(turnResult){
  return {
    type: SET_TURN_RESULT,
    payload: turnResult,
  }
}