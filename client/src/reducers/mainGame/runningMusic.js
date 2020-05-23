
import { 
    CLICK_ANSWER,
    SET_ANSWER_ONCE,
} from '../../actions/mainGame/runningMusic';

const initialState = {
    /* determine if the user answer to the quizz, as they can only answer one time */
    answerOnce: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case CLICK_ANSWER:
            return {
                ...state,
                findAnime: action.payload.findAnime,
                answerOnce: true,
            }
        case SET_ANSWER_ONCE:
            return {
                ...state,
                answerOnce: action.payload,
            }
        default:
            return state;
    }
};