import {
    LOAD_AVALAIBLE_GAME,
    USER_RUNNING_GAME,
    UPDATE_FIELD_LEVEL,
    UPDATE_FIELD_ANSWER,
    UPDATE_FIELD_WINNING_SCORE,
    UPDATE_FIELD_MUSIC_TYPE,
    OPEN_CREATE_FORM,
    CREATE_GAME_SUCCESS,
    CREATE_GAME_FAILURE,
    CREATE_GAME_REQUEST,
    CLEAR_GAME_DATA,
    USER_JOIN_GAME,
    USER_JOIN_GAME_REQUEST,
    USER_JOIN_GAME_SUCCESS,
    USER_JOIN_GAME_FAILURE
} from './action';

const initialState = {
    /** Create game state */
    level: 1, // easy
    musicType: 1, // opening and ending
    isGameCreate: false,
    isGameLoading: false,
    isGameCreateError: false,
    
    /** Game list state */
    userRunningGame: false,
    isOpenCreateForm: false,
    isGameJoinLoading: false,
    isGameJoinError: false,
    isGameJoin: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOAD_AVALAIBLE_GAME:
            return {
                ...state,
                games: action.payload,
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
        case CREATE_GAME_SUCCESS:
            return {
                ...state,
                isGameCreate: true,
                isGameLoading: false,
                isGameCreateError: false,
            }
        case CREATE_GAME_REQUEST:
            return {
                ...state,
                isGameCreate: false,
                isGameLoading: true,
                isGameCreateError: false
            }
        case CREATE_GAME_FAILURE:
            return {
                ...state,
                isGameCreate: false,
                isGameLoading: false,
                isGameCreateError: true
            }
        case CLEAR_GAME_DATA:
            return {
                ...state,
                isGameCreate: false,
                isGameLoading: false,
                isGameCreateError: false,
                isGameJoin: false,
                isGameJoinLoading: false,
                isGameJoinError: false
            }
        case USER_JOIN_GAME_REQUEST:
            return {
                ...state,
                isGameJoin: false,
                isGameJoinLoading: true,
                isGameJoinError: false
            }
        case USER_JOIN_GAME_FAILURE:
            return {
                ...state,
                isGameJoin: false,
                isGameJoinLoading: false,
                isGameJoinError: true
            }
        case USER_JOIN_GAME:
        case USER_JOIN_GAME_SUCCESS:
            return {
                ...state,
                //gameId: action.payload.gameId,
                isGameJoin: true,
                isGameJoinLoading: false,
                isGameJoinError: false
            }
        default:
            return state;
    }
};