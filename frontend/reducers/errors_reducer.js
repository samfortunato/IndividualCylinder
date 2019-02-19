import { combineReducers } from 'redux';

import sessionErrorsReducer from './session_errors_reducer';
import videosErrorsReducer from './videos_errors_reducer';
import commentsErrorsReducer from './comments_errors_reducer';
import likesErrorsReducer from './likes_errors_reducer';
import subscriptionsErrorsReducer from './subscriptions_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  videos: videosErrorsReducer,
  comments: commentsErrorsReducer,
  likes: likesErrorsReducer,
  subscriptions: subscriptionsErrorsReducer
});
