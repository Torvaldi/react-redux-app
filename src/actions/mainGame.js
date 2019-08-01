
import { API_GET_ANIMES, getAuthorizationHeader } from '../helper/api';

export const GET_ANIMES = 'GET_ANIMES';
export const SWITCH_RUNNING_STATUS = 'SWITCH_RUNNING_STATUS';
export const SET_ANIME_TO_GUESS = 'SET_ANIME_TO_GUESS';
export const SET_ANIME_TO_GUESS_CALL = 'SET_ANIME_TO_GUESS_CALL';

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

export function switchRunningStatus(){
  return {
    type: SWITCH_RUNNING_STATUS,
    payload: {},
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