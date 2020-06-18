
import { UPDATE_FIELD_CHAT_MESSAGE, ADD_MESSAGE_TO_CHAT, CLEAR_CHAT } from '../actions/chat';

const initialState = {
    chatMessage: [],
    message: "",
}

export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_FIELD_CHAT_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        case ADD_MESSAGE_TO_CHAT:
            return {
                chatMessage: [...state.chatMessage, ...action.payload]
            }
        case CLEAR_CHAT: 
            return {
                ...state,
                chatMessage : action.payload.chatMessage
            }
        default:
            return state;
    }
};