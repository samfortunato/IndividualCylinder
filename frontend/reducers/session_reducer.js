import {
  RECEIVE_CURRENT_USER,
  LOG_OUT_CURRENT_USER
} from '../actions/session_actions';

const _nullUser = Object.freeze({
  id: null
});

const sessionReducer = (currentState = _nullUser, action) => {
  Object.freeze(currentState);
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: action.currentUser.id };
    case LOG_OUT_CURRENT_USER:
      return _nullUser;
    default:
      return currentState;
  }
};

export default sessionReducer;
