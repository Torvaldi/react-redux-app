import * as actions from 'Page/Auth/action';

describe('Auth reducer', () => {
    it('should create an action to update username value, changeUsername', () => {
        const username = "Hato";
        const expectedAction = {
            type: actions.UPDATE_FIELD_USERNAME,
            payload: { username }
        }
        expect(actions.changeUsername(username)).toEqual(expectedAction);
    });

    it('should create an action to update password value, changePassword', () => {
        const password = "1234";
        const expectedAction = {
            type: actions.UPDATE_FIELD_PASSWORD,
            payload: { password }
        }
        expect(actions.changePassword(password)).toEqual(expectedAction);
    });

    it('should create an action to update the mail value, changeMail', () =>{
        const mail = "toto@gmail.com";
        const expectedAction = {
            type: actions.UPDATE_FIELD_MAIL,
            payload: { mail }
        }
        expect(actions.changeMail(mail)).toEqual(expectedAction);
    });

    it('should create an action to update the password confirmation value, changePasswordConfirm', () => {
        const passwordConfirmation = "1234";
        const expectedAction = {
            type: actions.UPDATE_FIELD_PASSWORD_CONFIRM,
            payload: { passwordConfirmation }
          }
        expect(actions.changePasswordConfirm(passwordConfirmation)).toEqual(expectedAction);
    });

    it('should create an action to reset the login error, resetErrorLogin', () => {
        const expectedAction = {
            type: actions.RESET_ERROR_LOGIN,
            payload: {
                errorLogin: undefined,
            }
        }
        expect(actions.resetErrorLogin()).toEqual(expectedAction);
    });

    it('should create an action to reset the sucess message of registration, resetSucessRegister', () => {
        const expectedAction = {
            type: actions.RESET_SUCESS_REGISTER,
            payload: {
                messageRegister: undefined,
            }
        }
        expect(actions.resetSucessRegister()).toEqual(expectedAction);
    });

    it('should create an action to reset the error registration , resertErrorRegister', () => {
        const expectedAction = {
            type: actions.RESET_ERROR_REGISTER,
            payload: {
                errorRegister: undefined,
            }
        }
        expect(actions.resertErrorRegister()).toEqual(expectedAction);
    });

    // TODO, Test Login and REGISTER function, search how to test async function
});