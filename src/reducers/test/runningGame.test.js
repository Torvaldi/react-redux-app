import reducer from '../runningGame';
import * as runningGameAction from '../../actions/runningGame';

describe('auth reducer', () => {

    it('should uset game value, GET_GAME', () => {
        let previousState = { username: "bob" };
        let game = { id: 1 };
        let action = {
            type: runningGameAction.GET_GAME,
            payload: game
        }
        let expectedResult = {
            username: "bob",
            game,
        }
        let state = reducer(previousState, action);
        expect(state).toEqual(expectedResult)
    });
});