
import io from 'socket.io-client';
import { SOCKET_URL } from './config';

export default io(SOCKET_URL);

// game selection event
export const NEW_GAME = 'NEW_GAME';
export const JOIN_GAME = 'JOIN_GAME';

// game event
export const USER_JOIN_GAME = 'USER_JOIN_GAME';
export const USER_POST_CHAT = 'USER_POST_CHAT';