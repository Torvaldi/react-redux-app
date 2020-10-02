
import { 
    CLICK_NEXT,
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
        default:
            return state;
    }
};