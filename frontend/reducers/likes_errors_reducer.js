import { RECEIVE_LIKE_ERRORS } from '../actions/likes_actions';

const likesErrorsReducer = (currentState = [], action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_LIKE_ERRORS:
      return action.errors;
    
    default:
      return currentState;
  }
};

export default likesErrorsReducer;
