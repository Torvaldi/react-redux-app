import {
    LOAD_AVALAIBLE_GAME,  
    CREATE_GAME,
} from '../actions/game';

export default (state = {}, action) => {
    switch(action.type) {
        case LOAD_AVALAIBLE_GAME:
            return {
                ...state,
                games: action.payload,
            }
        default:
            return state;
    }
};