import {
    LOAD_AVALAIBLE_GAME,
    USER_JOIN_GAME,
    USER_RUNNING_GAME,
    CREATE_GAME,
} from '../actions/game';

const initialState = {
    userJoinGame: false,
    userRunningGame: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOAD_AVALAIBLE_GAME:
            return {
                ...state,
                games: action.payload,
            }
        case USER_JOIN_GAME:
            return {
                ...state,
                gameId: action.payload.gameId,
                userJoinGame: true,
            }
        case USER_RUNNING_GAME:
            return {
                ...state,
                runningGame: action.payload,
                userRunningGame: true,
            }
        default:
            return state;
    }
};