import React from 'react';

import authReducer from '../auth';
import * as action from '../../actions/auth';

describe('auth reducer', () => {

    // update state
    it('should handler update username (UPDATE_FIELD_USERNAME)', () => {
        let previousState = {'username': 'Bob'};
        let expectedResult = {'username' : 'Kevin'}
        let state = authReducer(previousState, action.changeUsername('Kevin'));
        expect(state).toEqual(expectedResult);
    });

    it('should handle update password (UPDATE_FIELD_PASSWORD)', () => {
        let previousState = {'username': 'Bob', 'password': '1234'};
        let expectedResult = {'username' : 'Bob', 'password': 'random'}
        let state = authReducer(previousState, action.changePassword('random'));
        expect(state).toEqual(expectedResult);
    });

    it('should handle update an email (UPDATE_FIELD_MAIL)', ()=> {
        let mail = "toto@hotmail.fr";
        let previousState = "hi there";
        let emailAction = {
            type: action.UPDATE_FIELD_MAIL,
            payload: { mail }
        }
        let expectedResult = {
            mail,
            previousState
        }
        let state = authReducer({previousState}, emailAction);
        expect(state).toEqual(expectedResult);
    });
    
    it('should handle update a password (UPDATE_FIELD_PASSWORD_CONFIRM)', ()=> {
        let passwordConfirmation = "toto@hotmail.fr";
        let previousValue = "hi there";
        let passwordConfirmationAction = {
            type: action.UPDATE_FIELD_PASSWORD_CONFIRM,
            payload: { passwordConfirmation }
        }
        let expectedResult = {
            passwordConfirmation,
            previousValue
        }
        let state = authReducer({previousValue}, passwordConfirmationAction);
        expect(state).toEqual(expectedResult);
    });

    //login
    it('should return the token user (LOGIN)', () => {
        let token = 'randomToken';
        let loginAction = {
            type: action.LOGIN,
            payload: { token }
        }
        let expectedResult = {
            token
        };
        let state = authReducer({token: 'nanana'}, loginAction);
        expect(state).toEqual(expectedResult);
    });

    it('should return a login error (LOGIN)', () => {
        let error = 'you must not throw trash on the floor';
        let loginAction = {
            type: action.LOGIN,
            payload: { error }
        }
        let expectedResult = {
            errorLogin : error
        };
        let state = authReducer({errorLogin: 'You must be kind'}, loginAction);
        expect(state).toEqual(expectedResult);
    });

    // register
    it('should return a message value after register (REGISTER)', ()=> {
        let messageRegister = "Congratulations! Your account has been created";
        let errorRegister = undefined;
        let registerAction = {
            type: action.REGISTER,
            payload: { messageRegister, errorRegister }
        }
        let expectedResult = {
            errorRegister,
            messageRegister,
        }
        let state = authReducer({errorRegister: 'You must be kind'}, registerAction);
        expect(state).toEqual(expectedResult);
    });

    it('should return an error after register (REGISTER)', ()=> {
        let error = 'this is an error';
        let registerAction = {
            type: action.REGISTER,
            payload: { error }
        }
        let expectedResult = {
            errorRegister: error,
            messageRegister: undefined,
        }
        let state = authReducer({}, registerAction);
        expect(state).toEqual(expectedResult);
    });

    // reset error
    it('should set errorLogin to undefined (RESET_ERROR_LOGIN)', () =>{
        let loginErrorAction = {
            type: action.LOGIN,
            payload: {
                errorLogin: undefined,
            }
        }
        let expectedResult = {
            errorLogin: undefined,
        }
        let state = authReducer({errorLogin: 'previous error'}, loginErrorAction);
        expect(state).toEqual(expectedResult);
    });

    it('should set errorRegister to undefine (RESET_ERROR_REGISTER)', () => {
        let registerErrorAction = {
            type: action.RESET_ERROR_REGISTER,
            payload: {
              errorRegister: undefined,
            }
        }
        let expectedResult = {
            errorRegister: undefined,
        }
        let state = authReducer({errorRegister: 'previous error'}, registerErrorAction);
        expect(state).toEqual(expectedResult);
    });

    it('should reset sucess message ()', () => {
        let resetSucessAction = {
            type: action.RESET_SUCESS_REGISTER,
            payload: {
              messageRegister: undefined,
            }
        }
        let expectedResult = {
            messageRegister: undefined,
        }
        let state = authReducer({messageRegister: 'It work'}, resetSucessAction);
        expect(state).toEqual(expectedResult);
    });
});
