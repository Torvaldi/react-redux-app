
import { 
    CLICK_NEXT,
    CLICK_NEXT_RESET
} from './action';

const initialState = {
    clickNext: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case CLICK_NEXT:
            return {
                ...state,
                clickNext: true
            }
        case CLICK_NEXT_RESET:
            return {
                ...state,
                clickNext: false
            }
        default:
            return state;
    }
};