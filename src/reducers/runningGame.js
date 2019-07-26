
import { GET_GAME } from '../actions/runningGame';

export default (state = {}, action) => {
    switch(action.type) {
        case GET_GAME:
            return {
                ...state,
                game: action.payload
            }
        default:
            return state;
    }
};