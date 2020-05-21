import * as actions from '../chat';

describe('chat action', () => {
    it('should create an action to update message value, changeMessage()', () => {
        let message = 'popopo';

        let expectedAction = {
            type: actions.UPDATE_FIELD_CHAT_MESSAGE,
            payload: message
        };
        expect(actions.changeMessage(message)).toEqual(expectedAction);
    });

    it('should create an action to add message to messages array, addMessageToChat()', () => {
        let player = {id: 1};
        let message = {};
        let data = {...player, ...message};
        let expectedAction = {
            type: actions.ADD_MESSAGE_TO_CHAT,
            payload: [{
              player: data.player,
              message: data.message,
            }]
          }
          expect(actions.addMessageToChat(data)).toEqual(expectedAction);
    });

});