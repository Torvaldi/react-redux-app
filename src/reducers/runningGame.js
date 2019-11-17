
import { GET_GAME, UPDATE_GAME_STATUS, SET_ALL_PLAYERS, ADD_NEW_PLAYER, GET_WINNERS } from '../actions/runningGame';

let initialState = {
    gameStatus: 1,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GAME:
            // set status value from database game status
            let gameStatus = 1;
            let databaseStatus = parseInt(action.payload.status);
            if (databaseStatus === 2) {
                gameStatus = 2;
            }
            if (databaseStatus === 3) {
                gameStatus = 3;
            }

            return {
                ...state,
                game: action.payload,
                gameStatus,
            };
        case UPDATE_GAME_STATUS:
            return {
                ...state,
                gameStatus: action.payload,
            };
        case SET_ALL_PLAYERS:
            return {
                ...state,
                players: action.payload
            };
        case ADD_NEW_PLAYER:
            return {
                ...state,
                players: { ...state.players, ...action.payload }
            };
        case GET_WINNERS:
            return {
                ...state,
                winners: action.payload,
            };
        default:
            return state;
    }
};