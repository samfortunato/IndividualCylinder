import {
  RECEIVE_VIDEO_ERRORS,
  CLEAR_VIDEO_ERRORS
} from '../actions/videos_actions';

const videosErrorReducer = (currentState = [], action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_VIDEO_ERRORS:
      return action.errors.responseJSON;

    case CLEAR_VIDEO_ERRORS:
      return [];
      
    default:
      return currentState;
  }
};

export default videosErrorReducer;
