import { combineReducers } from 'redux';

import sessionErrorsReducer from './session_errors_reducer';
import videosErrorReducer from './videos_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  videos: videosErrorReducer
});
