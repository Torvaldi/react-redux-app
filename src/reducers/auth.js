import {UPDATE_FIELD_USERNAME,  UPDATE_FIELD_PASSWORD, LOGIN, RESET_ERROR } from '../actions/auth';

export default (state = {}, action) => {
    switch(action.type) {
        case UPDATE_FIELD_USERNAME:
            return {
                ...state,
                username: action.payload.username,
            }
        case UPDATE_FIELD_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
            }
        case LOGIN:
            return {
                ...state,
                error: action.payload.error,
                token : action.payload.token
            }
        case RESET_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
};