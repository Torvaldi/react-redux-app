import { combineReducers } from 'redux';

import token from './reducers/token';
import auth from './reducers/auth';
import game from './reducers/game';
import runningGame from './reducers/runningGame';
import chat from './reducers/chat';
import player from './reducers/player'

export default combineReducers({
    auth,
    token,
    game,
    runningGame,
    chat,
    player,
});