import {
    UPDATE_FIELD_USERNAME,  
    UPDATE_FIELD_PASSWORD, 
    LOGIN_SUCCESS, 
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    UPDATE_FIELD_PASSWORD_CONFIRM, 
    UPDATE_FIELD_MAIL,
    RESET_ERROR_LOGIN,
    RESET_ERROR_REGISTER,
    RESET_SUCESS_REGISTER,
} from './action';

let defaultState = {
    username: null,
    password: null,
    errorLogin: null,
    token: null,
    isLoginLoading: false,
    isRegisterLoading: false,
    errorRegister: null,
    messageRegister: null,
    isRegisterSuccess: false,
}

export default (state = defaultState, action) => {
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
        case LOGIN_REQUEST:
            return {
                ...state,
                token: null,
                errorLogin: null,
                isLoginLoading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                errorLogin: null,
                token : action.payload.token,
                isLoginLoading: false,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                errorLogin: action.payload.error,
                token: null,
                isLoginLoading: false,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegisterLoading: false,
                errorRegister: null,
                messageRegister: "Congratulations! Your account has been created",
                isRegisterSuccess: true,
            }
        case REGISTER_REQUEST: 
            return {
                ...state,
                isRegisterLoading: true,
                errorRegister: null,
                messageRegister: null,
                isRegisterSuccess: false,
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isRegisterLoading: false,
                errorRegister: action.payload.error,
                messageRegister: null,
                isRegisterSuccess: false,
            }
        default:
            return state;
    }
};