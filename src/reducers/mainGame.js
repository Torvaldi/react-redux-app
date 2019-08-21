
import { 
    GET_ANIMES, 
    SWITCH_RUNNING_STATUS,
    SET_ANIME_TO_GUESS,
    SET_ANIME_TO_GUESS_CALL,
    SET_SCORE,
} from '../actions/mainGame';

const initialState = {
    // initialise to 0
    runningStatus: 0,
    animeToGuessCall: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ANIMES:
            return {
                ...state,
                animes: action.payload,
            }
        case SWITCH_RUNNING_STATUS:
            return {
                ...state,
                runningStatus: action.payload,
            }
        case SET_ANIME_TO_GUESS:
            return {
                ...state,
                animeToGuess: action.payload,
            }
        case SET_ANIME_TO_GUESS_CALL:
            return {
                ...state,
                animeToGuessCall: action.payload,
            }
        case SET_SCORE:
            return {
                ...state,
                scores: action.payload,
            }
        default:
            return state;
    }
};