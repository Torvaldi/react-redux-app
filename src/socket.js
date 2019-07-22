
import io from 'socket.io-client';
import { SOCKET_URL } from './config';

export default io(SOCKET_URL);

export const NEW_GAME = 'NEW_GAME';
export const JOIN_GAME = 'JOIN_GAME';