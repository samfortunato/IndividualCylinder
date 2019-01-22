import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import sessionReducer from './session_reducer';

export default combineReducers({
  users: usersReducer,
  session: sessionReducer
});
