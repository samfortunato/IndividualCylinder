import merge from 'lodash/merge';

import { RECEIVE_VIDEO } from '../actions/videos_actions';

import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../actions/comments_actions';

const commentsReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_COMMENT: {
      return merge({}, currentState, { [action.comment.id]: action.comment });
    }
    
    case REMOVE_COMMENT: {
      let nextState = merge({}, currentState);
      delete nextState[action.id];
      
      return nextState;
    }

    case RECEIVE_VIDEO: {
      return merge({}, currentState, action.comments);
    }
    
    default:
      return currentState;
  }
};

export default commentsReducer;
