import * as actions from '../game';

describe('Game action', () => {
    it('should create an action to changeLevel state, changeLevel()', () => {
        let level =  2;
        let expectedAction = {
           type: actions.UPDATE_FIELD_LEVEL,
           payload: { level }
        };
        let level2 =  0;
        let expectedAction2 = {
           type: actions.UPDATE_FIELD_LEVEL,
           payload: { level: 1 }
        };
        let level3 =  6;
        let expectedAction3 = {
           type: actions.UPDATE_FIELD_LEVEL,
           payload: { level: 3 }
        };
        expect(actions.changeLevel(level)).toEqual(expectedAction);
        expect(actions.changeLevel(level2)).toEqual(expectedAction2);
        expect(actions.changeLevel(level3)).toEqual(expectedAction3);
    });

    it('should create an action to changeAnswer state, changeAnswer()', () => {
        let answer1 =  5;
        let expectedAction1 = {
            type: actions.UPDATE_FIELD_ANSWER,
            payload: { answer: answer1 }
        };
        let answer2 =  1;
        let expectedAction2 = {
            type: actions.UPDATE_FIELD_ANSWER,
            payload: { answer: 3 }
        };
        let answer3 =  30;
        let expectedAction3 = {
            type: actions.UPDATE_FIELD_ANSWER,
            payload: { answer: 15 }
        };
        expect(actions.changeAnswer(answer1)).toEqual(expectedAction1);
        expect(actions.changeAnswer(answer2)).toEqual(expectedAction2);
        expect(actions.changeAnswer(answer3)).toEqual(expectedAction3);
    });

    it('should create an action to change winning score state, changeWinningScore()', () => {
        let winningScore = 20;
        let expectedAction = {
            type: actions.UPDATE_FIELD_WINNING_SCORE,
            payload: { winningScore }
        };
        let winningScore2 = 8;
        let expectedAction2 = {
            type: actions.UPDATE_FIELD_WINNING_SCORE,
            payload: { winningScore: 10 }
        };
        expect(actions.changeWinningScore(winningScore)).toEqual(expectedAction);
        expect(actions.changeWinningScore(winningScore2)).toEqual(expectedAction2);
    });

    it('should create an action when a user REjoin a game, userReJoinGame()', () => {
        let gameId = 4;
        let expectedAction = {
            type: actions.USER_JOIN_GAME,
            payload: { gameId }
        }
        expect(actions.userReJoinGame(gameId)).toEqual(expectedAction);
    });

});