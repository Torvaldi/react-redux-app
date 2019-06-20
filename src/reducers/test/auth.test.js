import React from 'react';

import authReducer from '../auth';
import * as action from '../../actions/auth';

describe('auth reducer', () => {

    it('should handler update username', () => {
        let previousState = {'username': 'Bob'};
        let expectedResult = {'username' : 'Kevin'}
        let state = authReducer(previousState, action.changeUsername('Kevin'));
        expect(state).toEqual(expectedResult);
    });

    it('should handle update password', () => {
        let previousState = {'username': 'Bob', 'password': '1234'};
        let expectedResult = {'username' : 'Bob', 'password': 'random'}
        let state = authReducer(previousState, action.changePassword('random'));
        expect(state).toEqual(expectedResult);
    });

    it('should reset error state value', () => {
        let previousState = {
            username: 'Bob', 
            password: '1234', 
            error: 'Your have an error'
        };
        let expectedResult = {
            username: 'Bob', 
            password: '1234', 
            error: undefined
        };
        let state = authReducer(previousState, action.resetError());
        expect(state).toEqual(expectedResult);
    });

    it('should return the token user', () => {
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

    it('should return a login error', () => {
        let error = 'you must not throw trash on the floor';
        let loginAction = {
            type: action.LOGIN,
            payload: { error }
        }
        let expectedResult = {
            error
        };
        let state = authReducer({error: 'You must be kind'}, loginAction);
        expect(state).toEqual(expectedResult);
    });

});
