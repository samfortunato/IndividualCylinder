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

import { RECEIVE_LIKE } from '../actions/likes_actions';

import { RECEIVE_CHANNEL } from '../actions/channels_actions';

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
      const { video_id: videoId, id: commentId } = action.comment;

      if (!nextState[videoId].comment_ids.includes(commentId)) {
        nextState[videoId].comment_ids.unshift(commentId);
      }

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

    case RECEIVE_LIKE: {
      if (action.like.likable_type !== 'Video') {
        return currentState;
      }

      let nextState = merge({}, currentState);

      const videoId = action.like.likable_id;
      const currentUserLike = nextState[videoId].current_user_like;
      const videoWasAlreadyJudged = currentUserLike === true || currentUserLike === false;
      
      if (action.like.was_liked === true) {
        if (currentUserLike === true) {
          nextState[videoId].current_user_like = null;
          nextState[videoId].likes--;
        } else {
          nextState[videoId].current_user_like = true;
          nextState[videoId].likes++;
  
          if (videoWasAlreadyJudged) {
            nextState[videoId].dislikes--;
          }
        }
      } else  {
        if (currentUserLike === false) {
          nextState[videoId].current_user_like = null;
          nextState[videoId].dislikes--;
        } else {
          nextState[videoId].current_user_like = false;
          nextState[videoId].dislikes++;
  
          if (videoWasAlreadyJudged) {
            nextState[videoId].likes--;
          }
        }
      }

      return nextState;
    }

    case RECEIVE_CHANNEL:
      return merge({}, currentState, action.videos);

    default:
      return currentState;
  }
};

export default videosReducer;
