import { combineReducers } from 'redux';

import token from 'middleware/reducer';
import auth from 'Page/Auth/reducer';
import game from 'Page/Game/reducer';
import runningGame from 'Page/BlindTest/reducer';
import chat from 'Page/BlindTest/Chat/reducer';
//import player from './Page/'
import mainGame from 'Page/BlindTest/MainGame/reducer';
import runningMusic from 'Page/BlindTest/MainGame/Running/RunningMusic/reducer';

export default combineReducers({
    auth,
    token,
    game,
    runningGame,
    chat,
    //player,
    mainGame,
    runningMusic
});