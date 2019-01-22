import merge from 'lodash/merge';

import { RECEIVE_USER } from '../actions/users_actions';

const usersReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_USER:
      let newState = merge({}, currentState);
      newState[action.user.id] = action.user;

      return newState;
    default:
      return currentState;
  }
};

export default usersReducer;
