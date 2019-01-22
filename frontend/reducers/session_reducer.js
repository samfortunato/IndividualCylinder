import {
  LOG_IN_USER,
  LOG_OUT_USER
} from '../actions/session_actions';

const sessionReducer = (currentState = [null], action) => {
  switch (action.type) {
    default:
      return currentState;
  }
};

export default sessionReducer;
