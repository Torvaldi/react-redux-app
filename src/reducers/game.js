import {
    LOAD_AVALAIBLE_GAME,
    USER_JOIN_GAME,
    USER_RUNNING_GAME,
    CREATE_GAME,
    UPDATE_FIELD_LEVEL,
    UPDATE_FIELD_ANSWER,
    UPDATE_FIELD_WINNING_SCORE,
    OPEN_CREATE_FORM,
    UPDATE_TYPE_OP,
} from '../actions/game';

const initialState = {
    userJoinGame: false,
    userRunningGame: false,
    userCreateGame: false,
    isOpenCreateForm: false,
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
        case UPDATE_TYPE_OP:
            return {
                ...state,
                type: action.payload.type
            }
        case CREATE_GAME:
            if(action.payload.error === undefined){
                return {
                    ...state,
                    userCreateGame: true,
                }
            }
            return {
                ...state,
                userCreateGame: false,
            }
        case OPEN_CREATE_FORM:
            if(action.payload.isOpenCreateForm === true){
                return {
                    ...state,
                    isOpenCreateForm: false 
                }
            }
            return {
                ...state,
                isOpenCreateForm: true 
            }
        default:
            return state;
    }
};