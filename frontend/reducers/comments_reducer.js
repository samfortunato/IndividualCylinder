import merge from 'lodash/merge';

import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../actions/comments_actions';

const commentsReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_COMMENT: {
      return merge({}, currentState, action.comment);
    }
    
    case REMOVE_COMMENT: {
      let nextState = merge({}, currentState);
      delete nextState[action.id];

      return nextState;
    }
    
    default:
      return currentState;
  }
};

export default commentsReducer;
