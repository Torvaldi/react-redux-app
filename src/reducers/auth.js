import {
    UPDATE_FIELD_USERNAME,  
    UPDATE_FIELD_PASSWORD, 
    LOGIN, 
    REGISTER,
    UPDATE_FIELD_PASSWORD_CONFIRM, 
    UPDATE_FIELD_MAIL,
    RESET_ERROR_LOGIN,
    RESET_ERROR_REGISTER,
    RESET_SUCESS_REGISTER,
    USER,
    TOKEN_SUCESS,
    TOKEN_ERROR
} from '../actions/auth';

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
        case UPDATE_FIELD_PASSWORD_CONFIRM:
            return {
                ...state,
                passwordConfirmation: action.payload.passwordConfirmation
            }
        case UPDATE_FIELD_MAIL:
            return {
                ...state,
                mail: action.payload.mail
            }
        case RESET_ERROR_LOGIN:
            return {
                ...state,
                errorLogin: action.payload.errorLogin
            }
        case RESET_ERROR_REGISTER:
            return {
                ...state,
                errorRegister: action.payload.errorRegister
            }
        case RESET_SUCESS_REGISTER:
            return {
                ...state,
                messageRegister: action.payload.messageRegister
            }
        case LOGIN:
            return {
                ...state,
                errorLogin: action.payload.error,
                token : action.payload.token
            }
        case REGISTER:
            if(action.payload.error === undefined){
                return {
                    ...state,
                    errorRegister: action.payload.error,
                    messageRegister: "Congratulations! Your account has been created",
                }
            }
            return {
                ...state,
                errorRegister: action.payload.error,
                messageRegister: undefined,
            }
        default:
            return state;
    }
};