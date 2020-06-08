import {
    LOAD_AVALAIBLE_GAME,
    USER_JOIN_GAME,
    USER_RUNNING_GAME,
    UPDATE_FIELD_LEVEL,
    UPDATE_FIELD_ANSWER,
    UPDATE_FIELD_WINNING_SCORE,
    UPDATE_FIELD_MUSIC_TYPE,
    OPEN_CREATE_FORM,
    CREATE_GAME,
} from '../actions/game';

const initialState = {
    userJoinGame: false,
    userRunningGame: false,
    userCreateGame: false,
    isOpenCreateForm: false,
    isGameCreate: false,
    level: 1,
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

            let userRunningGame = true;
            if(Object.keys(action.payload).length === 0){
                userRunningGame = false;
            }
            return {
                ...state,
                runningGame: action.payload,
                userRunningGame,
            }
        case UPDATE_FIELD_LEVEL:
            return {
                ...state,
                level: action.payload.level
            }
        case UPDATE_FIELD_ANSWER:
            return {
                ...state,
                answer: action.payload.answer
            }
        case UPDATE_FIELD_WINNING_SCORE:
            return {
                ...state,
                winningScore: action.payload.winningScore
            }
        case UPDATE_FIELD_MUSIC_TYPE:
            return {
                ...state,
                musicType: action.payload.musicType
            }
        case OPEN_CREATE_FORM:
            return {
                ...state,
                isOpenCreateForm: action.payload.isOpenCreateForm 
            }
        case CREATE_GAME:
            return {
                ...state,
                isGameCreate: true,
            }
        default:
            return state;
    }
};