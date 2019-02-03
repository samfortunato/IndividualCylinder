import merge from 'lodash/merge';

import {
  RECEIVE_ALL_VIDEOS,
  RECEIVE_VIDEO,
  REMOVE_VIDEO
} from '../actions/videos_actions';

import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../actions/comments_actions';

const videosReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_ALL_VIDEOS: {
      return action.videos;
    }
    
    case RECEIVE_VIDEO: {
      let nextState = merge({}, currentState);
      nextState[action.video.id] = action.video;

      return nextState;
    }

    case REMOVE_VIDEO: {
      let nextState = merge({}, currentState);
      delete nextState[action.videoId];

      return nextState;
    }

    case RECEIVE_COMMENT: {
      let nextState = merge({}, currentState);
      nextState[action.comment.video_id].comment_ids.unshift(action.comment.id);

      return nextState;
    }

    case REMOVE_COMMENT: {
      let nextState = merge({}, currentState);

      const videoId = action.comment.video_id;
      const videoCommentIdIndex = nextState[videoId]
        .comment_ids
        .indexOf(action.comment.id);

      nextState[videoId].comment_ids.splice(videoCommentIdIndex, 1);

      return nextState;
    }

    default:
      return currentState;
  }
};

export default videosReducer;
