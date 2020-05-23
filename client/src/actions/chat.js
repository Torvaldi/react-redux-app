
export const UPDATE_FIELD_CHAT_MESSAGE = 'UPDATE_FIELD_CHAT_MESSAGE';
export const ADD_MESSAGE_TO_CHAT = 'ADD_MESSAGE_TO_CHAT';

export function changeMessage(message){
    return {
      type: UPDATE_FIELD_CHAT_MESSAGE,
      payload: message
    }
  }
  
  export const addMessageToChat = (data) => {
    return {
      type: ADD_MESSAGE_TO_CHAT,
      payload: [{
        username: data.username,
        message: data.message,
        messageType: data.messageType,
      }]
    }
  }