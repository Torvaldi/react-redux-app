import * as actions from '../token';

describe('Game reducer', () => {
    it('should create an action to modify succes token value, changeLevel()', () => {
        let sucessToken = true;
        let token = 'randomToken';
        let user =  {id: 5, name: 'bob'};

        let expectedAction = {
            type: actions.TOKEN_SUCESS,
            payload: { 
              sucessToken,
              token,
              user
            }
        };
        expect(actions.setTokenSucess(sucessToken, token, user)).toEqual(expectedAction);
    });

    it('should create an action to modify error token value', () => {
        let errorToken =  true;
        let expectedAction = {
            type: actions.TOKEN_ERROR,
            payload: { 
              errorToken,
            }
          };
          expect(actions.setTokenError(errorToken)).toEqual(expectedAction);
    });

});