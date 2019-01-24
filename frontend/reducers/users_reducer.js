import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const usersReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let newState = merge(
        {},
        currentState,
        { [action.currentUser.id]: action.currentUser }
      );

      return newState;
    default:
      return currentState;
  }
};

export default usersReducer;
