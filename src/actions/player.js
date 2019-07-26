import { API_USER_GAME, getAuthorizationHeader } from '../helper/api';

export const GET_SCORE = 'GET_SCORE';
export const GET_PLAYERS = 'GET_PLAYERS';

/**
 * get player data of the given game  (id, username etc)
 * @param {*function} dispatch 
 * @param {*object} data, game, token
 */
export function getPlayer(dispatch, data){
    fetch(API_USER_GAME + '?id=' + data.game.id, {
        method: 'GET',
        headers: getAuthorizationHeader(data.token),
      })
      .then(response => response.json())
      .then(result => 
        dispatch({
          type: GET_PLAYERS,
          payload: result
        })
      );
}

/**
 * set score action that was receipe via the socket
 * format it in a object
 * @param {*int} scores
 * @return {*object}
 */
export function playerSetScore(scores){
  let playerId = Object.keys(scores);
  let playerScore = Object.values(scores)

  let result = playerId.map((value, index) => {
    return {
      id: parseInt(value), 
      score: parseInt(playerScore[index])
    }
  });

  return {
      type: GET_SCORE,
      payload: result
  }
}