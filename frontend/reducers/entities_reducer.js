import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import searchResultsReducer from './search_results_reducer';
import videosReducer from './videos_reducer';
import commentsReducer from './comments_reducer';
import channelsReducer from './channels_reducer';

export default combineReducers({
  users: usersReducer,
  search_results: searchResultsReducer,
  videos: videosReducer,
  comments: commentsReducer,
  channels: channelsReducer
});
