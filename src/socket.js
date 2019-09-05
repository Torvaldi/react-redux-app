
import io from 'socket.io-client';
import { SOCKET_URL } from './config';

export default io(SOCKET_URL);

// game selection event
export const NEW_GAME = 'NEW_GAME';
export const GAME_UPDATE = 'GAME_UPDATE';

// game event
export const USER_JOIN_GAME = 'USER_JOIN_GAME';
export const USER_POST_CHAT = 'USER_POST_CHAT';
export const LAUCH_GAME = 'LAUCH_GAME';
export const SEND_ANIME_TO_GUESS = 'SEND_ANIME_TO_GUESS';
export const CLICK_ANSWER = 'CLICK_ANSWER';
//export const CHANGE_RUNNING_STATUS = 'CHANGE_RUNNING_STATUS';

export const CHANGE_STATUS_0_TO_1 = 'CHANGE_STATUS_0_TO_1';
export const CHANGE_STATUS_1_TO_2 = 'CHANGE_STATUS_1_TO_2';
export const CHANGE_STATUS_2_TO_0 = 'CHANGE_STATUS_2_TO_0';
export const SET_DEFAULT_STATUS = 'SET_DEFAULT_STATUS';