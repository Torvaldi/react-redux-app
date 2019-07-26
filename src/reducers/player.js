
import { GET_PLAYERS, GET_SCORE } from '../actions/player';

const initialState = {
    players: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
            }
        case GET_SCORE:
            return {
                ...state,
                scores: action.payload
            }
        default:
            return state;
    }
};