
import { 
    CLICK_ANSWER,
    SET_ANSWER_ONCE,
    RESET_ANIME_SELECT,
} from './action';

const initialState = {
    /* determine if the user answer to the quizz, as they can only answer one time */
    answerOnce: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case CLICK_ANSWER:
            return {
                ...state,
                animeSelect: action.payload.animeSelect,
                answerOnce: true,
            }
        case SET_ANSWER_ONCE:
            return {
                ...state,
                answerOnce: action.payload,
            }
        case RESET_ANIME_SELECT:
            return {
                ...state,
                animeSelect: null,
            }
        default:
            return state;
    }
};