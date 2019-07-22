import { combineReducers } from 'redux';

import token from './reducers/token';
import auth from './reducers/auth';
import game from './reducers/game';

export default combineReducers({
    auth,
    token,
    game,
});