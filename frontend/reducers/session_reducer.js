import {
  LOG_IN_USER,
  LOG_OUT_USER
} from '../actions/session_actions';

const sessionReducer = (currentState = {}, action) => {
  Object.freeze(currentState);
  
  switch (action.type) {
    case LOG_IN_USER: {
      return action.currentUser;
    }

    default:
      return currentState;
  }
};

export default sessionReducer;
