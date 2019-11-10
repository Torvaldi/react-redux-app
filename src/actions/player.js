import { API_USER_GAME, getAuthorizationHeader } from '../helper/api';


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