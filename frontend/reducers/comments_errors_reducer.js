import {
  RECEIVE_COMMENT_ERRORS,
  CLEAR_COMMENT_ERRORS
} from '../actions/comments_actions';

const commentsErrorsReducer = (currentState = [], action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    
    case CLEAR_COMMENT_ERRORS:
      return [];
    
    default:
      return currentState;
  }
};

export default commentsErrorsReducer;
