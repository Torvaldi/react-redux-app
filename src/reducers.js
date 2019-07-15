import { combineReducers } from 'redux';

import auth from './reducers/auth';
import game from './reducers/game';


export default combineReducers({
    auth,
    game,
});