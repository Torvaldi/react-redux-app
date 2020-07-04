import chatReducer from 'Page/BlindTest/Chat/reducer';
import * as chatAction from 'Page/BlindTest/Chat/action';

describe('auth reducer', () => {

    it('should update message value, UPDATE_FIELD_CHAT_MESSAGE', () => {
        let previousState = {};
        let message = "Bonjour";
        let expectedResult = {
            message,
        }
        let state = chatReducer(previousState, chatAction.changeMessage(message));
        expect(state).toEqual(expectedResult)
    });

    it('should add message to messages array, ADD_MESSAGE_TO_CHAT', () => {
        let previousState = {
            chatMessage: [{message: 'yo'}, {message: 'bobobo'}],
        }
        let actionData = {
            player: { id:5 },
            message: { message: 'POPO' }
        }
        let payload = [{
            player: actionData.player,
            message: actionData.message
          }]
        let expectedResult = {
            chatMessage: [...previousState.chatMessage, ...payload]
        }
        let state = chatReducer(previousState, chatAction.addMessageToChat(actionData));
        expect(state).toEqual(expectedResult)
    });
});