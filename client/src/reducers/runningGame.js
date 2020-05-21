
import { GET_GAME, UPDATE_GAME_STATUS, SET_ALL_PLAYERS, ADD_NEW_PLAYER, GET_WINNERS, REMOVE_PLAYER } from '../actions/runningGame';

let initialState = {
    gameStatus: 1,
    players : [],
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
        default:
            return state;
    }
};