import gameReducer from '../game';
import * as actionGame from '../../actions/game';

describe('auth reducer', () => {

    it('should load avalaible game, LOAD_AVALAIBLE_GAME', () => {
        let previousState = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false
        };
        let games = [ {id:1 }, {id:2} ];
        let action = { type: actionGame.LOAD_AVALAIBLE_GAME, payload: games };

        let expectedResult = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false,
            games
        };

        let state = gameReducer(previousState, action);
        expect(state).toEqual(expectedResult)
    });

    it('should set game data when user join game, USER_JOIN_GAME', () => {
        let previousState = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false
        };
        let action = { type: actionGame.USER_JOIN_GAME, payload: {gameId: 1} };

        let expectedResult = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false,
            gameId: 1,
            userJoinGame: true,
        };

        let state = gameReducer(previousState, action);
        expect(state).toEqual(expectedResult);
    });

    it('should set game running USER_RUNNING_GAME', () => {
        let previousState = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false
        };
        let game = {id: 1};
        let action = { type: actionGame.USER_RUNNING_GAME, payload: {game} };

        let expectedResult = {
            runningGame: {game},
            userRunningGame: true,
            userCreateGame: false,
            userJoinGame: false,
        };

        let state = gameReducer(previousState, action);
        expect(state).toEqual(expectedResult);
    });

    it('should update level field, UPDATE_FIELD_LEVEL', () => {
        let previousState = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false
        };
        let expectedResult = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false,
            level: 1,
        };
        let state = gameReducer(previousState, actionGame.changeLevel(1));
        expect(state).toEqual(expectedResult);
    });

    it('should update level answer, UPDATE_FIELD_ANSWER', () => {
        let previousState = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false
        };
        let expectedResult = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false,
            answer: 15,
        };
        let state = gameReducer(previousState, actionGame.changeAnswer(15));
        expect(state).toEqual(expectedResult);
    });

    it('should update winning score, UPDATE_FIELD_WINNING_SCORE', () => {
        let previousState = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false
        };
        let expectedResult = {
            userJoinGame: false,
            userRunningGame: false,
            userCreateGame: false,
            winningScore: 150,
        };
        let state = gameReducer(previousState, actionGame.changeWinningScore(150));
        expect(state).toEqual(expectedResult);
    });

    it('should set create game data to true, CREATE_GAME', () => {
        let previousState = {};
        let action = { type: actionGame.CREATE_GAME, payload: {} }
        let expectedResult = {
            userCreateGame: true,
        };
        let state = gameReducer(previousState, action);
        expect(state).toEqual(expectedResult);
    });

    it('should set create game data to false, CREATE_GAME', () => {
        let previousState = {};
        let action = { type: actionGame.CREATE_GAME, payload: {error: "error content"} }
        let expectedResult = {
            userCreateGame: false,
        };
        let state = gameReducer(previousState, action);
        expect(state).toEqual(expectedResult);
    });

});