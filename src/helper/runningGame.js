
import { API_GAME_UPDATE_STATUS, getAuthorizationHeader } from '../helper/api';

export function updateDatabaseGameStatus(token, gameId, statusId){
    fetch(API_GAME_UPDATE_STATUS, {
        method: 'POST',
        headers: getAuthorizationHeader(token),
        body: JSON.stringify({
            'id': gameId, 
            'status' : statusId
          }),
      });
  }