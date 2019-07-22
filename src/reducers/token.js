import {
    TOKEN_ERROR, 
    TOKEN_SUCESS
} from '../actions/token';

let defaultState = {
    sucessToken: false,
    errorToken: false,
    token: null,
    user: null
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case TOKEN_SUCESS:
            return {
                ...state,
                sucessToken: action.payload.sucessToken,
                token: action.payload.token,
                user: action.payload.user
            }
        case TOKEN_ERROR:
                return {
                    ...state,
                    errorToken: action.payload.errorToken
                }
        default:
            return state;
    }
}