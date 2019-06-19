import * as actions from '../auth';


describe('Auth reducer', () => {
    it('should create an action to update username value', () => {
        const username = "Hato";
        const expectedAction = {
            type: actions.UPDATE_FIELD_USERNAME,
            payload: { username }
        }
        expect(actions.changeUsername(username)).toEqual(expectedAction);
    });

    it('should create an action to update password value', () => {
        const password = "1234";
        const expectedAction = {
            type: actions.UPDATE_FIELD_PASSWORD,
            payload: { password }
        }
        expect(actions.changePassword(password)).toEqual(expectedAction);
    });

    it('should create an action to reset error value', () => {
        const error = undefined;
        const expectedAction = {
            type: actions.RESET_ERROR,
            payload: { error }
        }
        expect(actions.resetError()).toEqual(expectedAction);
    });

    // TODO, Test Login function, search how to test fetch call
});