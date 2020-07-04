
import { 
    GET_GAME, 
    UPDATE_GAME_STATUS, 
    SET_ALL_PLAYERS, 
    ADD_NEW_PLAYER, 
    GET_WINNERS, 
    REMOVE_PLAYER, 
    CLEAR_GAME,
    USER_LEAVE_REQUEST,
    USER_LEAVE_SUCCESS,
    USER_LEAVE_FAILURE,
    SET_LAST_ANIME_PLAYED,
} from './action';

let initialState = {
    gameStatus: 1,
    players : [],
    game: null,
    isUserLeave: false,
    isUserLeaveLoading: false,
    isUserLeaveError: false,
    lastAnimePlayed: null,
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
        case CLEAR_GAME:
            return {
                ...state,
                game: null,
                isUserLeave: false,
                isUserLeaveLoading: false,
                isUserLeaveError: false,
            }
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
        case REMOVE_PLAYER:
            let statePlayers = state.players;
            let newPlayers = statePlayers.filter(player => player.userName !== action.payload.username);
            return {
                ...state,
                players: newPlayers,
            }
        case ADD_NEW_PLAYER:

            // prevent from adding the same player more than one time
            let newUser = state.players.find(player => player.userName === action.payload.userName);
            let players = state.players;
            if(newUser === undefined){
                players = [...state.players, action.payload]
            }
            return {
                ...state,
                players: players
            };
        case GET_WINNERS:
            return {
                ...state,
                winners: action.payload,
            };
        case SET_LAST_ANIME_PLAYED:
            return {
                ...state,
                lastAnimePlayed: action.payload
            }
        case USER_LEAVE_REQUEST:
            return {
                ...state,
                isUserLeave: false,
                isUserLeaveLoading: true,
                isUserLeaveError: false,
            }
        case USER_LEAVE_SUCCESS:
            return {
                ...state,
                isUserLeave: true,
                isUserLeaveLoading: false,
                isUserLeaveError: false,
            }
        case USER_LEAVE_FAILURE:
            return {
                ...state,
                isUserLeave: false,
                isUserLeaveLoading: false,
                isUserLeaveError: true,
            }
        default:
            return state;
    }
};