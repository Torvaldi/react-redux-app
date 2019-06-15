import { UPDATE_FIELD_AUTH, LOGIN } from './../constant/actions';

export default (state = {}, action) => {
    switch(action.type) {
        case UPDATE_FIELD_AUTH:
            return { ...state, [action.key]: action.value };
        case LOGIN:
            return {
                ...state,
                error: action.payload.error,
                token : action.payload.token
            }
        default:
            return state;
    }
};