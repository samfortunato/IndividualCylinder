import { CLEAR_COMMENT_ERRORS } from '../actions/comments_actions';

const commentsErrorsReducer = (currentState = [], action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case CLEAR_COMMENT_ERRORS:
      return [];
    
    default:
      return currentState;
  }
};

export default commentsErrorsReducer;
