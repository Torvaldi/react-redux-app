import { combineReducers } from 'redux';

import token from './reducers/token';
import auth from './reducers/auth';
import game from './reducers/game';
import runningGame from './reducers/runningGame';
import chat from './reducers/chat';
import player from './reducers/player'
import mainGame from './reducers/mainGame';
import runningMusic from './reducers/mainGame/runningMusic';

export default combineReducers({
    auth,
    token,
    game,
    runningGame,
    chat,
    player,
    mainGame,
    runningMusic
});