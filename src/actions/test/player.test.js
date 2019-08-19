import * as actions from '../player';

describe('player action', () => {
    it('should create an action to set player score, playerSetScore()', () => {
        let scores = { 5: "0", 10: '34' };

        let expectedAction = {
            type: actions.GET_SCORE,
            payload: [
                {
                    id: 5,
                    score: 0,
                },
                {
                    id: 10,
                    score: 34,
                }
            ]
        };
        expect(actions.playerSetScore(scores)).toEqual(expectedAction);
    });


});