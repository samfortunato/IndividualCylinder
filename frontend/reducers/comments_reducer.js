import merge from 'lodash/merge';

import { RECEIVE_VIDEO } from '../actions/videos_actions';

import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../actions/comments_actions';

import { RECEIVE_LIKE } from '../actions/likes_actions';

const commentsReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_COMMENT:
      return merge({}, currentState, { [action.comment.id]: action.comment });
    
    case REMOVE_COMMENT: {
      let nextState = merge({}, currentState);
      delete nextState[action.id];
      
      return nextState;
    }

    case RECEIVE_VIDEO:
      return merge({}, currentState, action.comments);

    case RECEIVE_LIKE: {
      if (action.like.likable_type !== 'Comment') {
        return currentState;
      }
      
      const nextState = merge({}, currentState);
      
      const { likable_id: commentId, was_liked: wasLiked } = action.like;
      const currentUserLike = nextState[commentId].current_user_like;

      if (wasLiked === false && currentUserLike === true) {
        nextState[commentId].current_user_like = false;
        nextState[commentId].likes--;
      } else if (wasLiked === true && currentUserLike === true) {
        nextState[commentId].current_user_like = null;
        nextState[commentId].likes--;
      } else if (wasLiked === false && currentUserLike === false) {
        nextState[commentId].current_user_like = null;
      } else if (wasLiked === false) {
        nextState[commentId].current_user_like = false;
      } else if (wasLiked === true) {
        nextState[commentId].current_user_like = true;
        nextState[commentId].likes++;
      }

      return nextState;
    }
    
    default:
      return currentState;
  }
};

export default commentsReducer;
