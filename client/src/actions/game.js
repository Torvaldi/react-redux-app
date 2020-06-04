import { 
  API_LOAD_GAME_BY_STATUS, 
  API_USER_JOIN_GAME, 
  API_USER_RUNNING_GAME,
  API_NEW_GAME,
  getAuthorizationHeader 
} from './../helper/api';

export const LOAD_AVALAIBLE_GAME = 'LOAD_AVALAIBLE_GAME';
export const CREATE_GAME = 'CREATE_GAME';
export const USER_JOIN_GAME = 'USER_JOIN_GAME';
export const USER_RUNNING_GAME = 'USER_RUNNING_GAME';
export const UPDATE_FIELD_LEVEL = 'UPDATE_FIELD_LEVEL';
export const UPDATE_FIELD_ANSWER = 'UPDATE_FIELD_ANSWER';
export const UPDATE_FIELD_WINNING_SCORE = 'UPDATE_FIELD_WINNING_SCORE';
export const UPDATE_FIELD_MUSIC_TYPE = 'UPDATE_FIELD_MUSIC_TYPE';
export const OPEN_CREATE_FORM = 'OPEN_CREATE_FORM';

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
 * get the last (if there are any) running game the user has
 */
export const getUserRunningGame = (dispatch, token) => {
  fetch(API_USER_RUNNING_GAME, {
    method: 'GET',
    headers: getAuthorizationHeader(token),
  })
  .then(response => response.json())
  .then(result => {
    dispatch({
      type: USER_RUNNING_GAME,
      payload: result
    });
  });
}

export const storeGame = (dispatch, token, data) => {
  fetch(API_NEW_GAME, {
    method: 'POST',
    headers: getAuthorizationHeader(token),
    body: JSON.stringify({
      'level': data.level, 
      'answer': data.answer,
      'score_to_win': data.winningScore,
      'musicType': data.musicType
    }),
  })
  .then(response => response.json())
  .then(result => 
    dispatch({
      type: CREATE_GAME,
      payload: result,
    })
  );
}


export function changeLevel(level){

  if(level > 3){
    level = 3;
  }

  if(level < 1){
    level = 1;
  }

  return {
    type: UPDATE_FIELD_LEVEL,
    payload: { level }
  }
}

export function changeAnswer(answer){

  if(answer < 3){
    answer = 3;
  }

  if(answer > 15){
    answer = 15;
  }

  return {
    type: UPDATE_FIELD_ANSWER,
    payload: { answer }
  }
}

export function changeWinningScore(winningScore){

  if(winningScore < 10){
    winningScore = 10;
  }

  return {
    type: UPDATE_FIELD_WINNING_SCORE,
    payload: { winningScore }
  }
}


export function changeMusicType(musicType){
  return {
    type: UPDATE_FIELD_MUSIC_TYPE,
    payload: { musicType }
  }
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

export function openCreateForm(isOpenCreateForm){
  return {
    type: OPEN_CREATE_FORM,
    payload: { isOpenCreateForm }
  }
}

