import merge from 'lodash/merge';

import {
  RECEIVE_ALL_VIDEOS,
  RECEIVE_VIDEO,
  REMOVE_VIDEO
} from '../actions/videos_actions';

const videosReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_ALL_VIDEOS: {
      return action.videos;
    }
    
    case RECEIVE_VIDEO: {
      let nextState = merge({}, currentState, action.video);

      return nextState;
    }

    case REMOVE_VIDEO: {
      let nextState = merge({}, currentState);
      delete nextState[action.videoId];

      return nextState;
    }

    default:
      return currentState;
  }
};

export default videosReducer;
