import {
  RECEIVE_SESSION_ERRORS,
  CLEAR_SESSION_ERRORS
} from '../actions/session_actions';

const sessionErrorsReducer = (currentState = [], action) => {
  Object.freeze(currentState);
  
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return [...action.errors.responseJSON];
    case CLEAR_SESSION_ERRORS:
      return [];
    default:
      return currentState;
  }
};

export default sessionErrorsReducer;
