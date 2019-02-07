import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/users_actions';

import {
  RECEIVE_VIDEO,
  RECEIVE_ALL_VIDEOS
} from '../actions/videos_actions';

import { RECEIVE_CHANNEL } from '../actions/channels_actions';

const usersReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      let newState = merge(
        {},
        currentState,
        { [action.currentUser.id]: action.currentUser }
      );

      return newState;
    }
      
    case RECEIVE_USER: {
      let newState = merge(
        {},
        currentState,
        { [action.user.id]: action.user }
      );

      return newState;
    }

    case RECEIVE_ALL_VIDEOS:
      return merge({}, currentState, action.users);
    
    case RECEIVE_VIDEO:
      return merge({}, currentState, action.users);

    case RECEIVE_CHANNEL:
      return merge({}, currentState, action.user);
      
    default:
      return currentState;
  }
};

export default usersReducer;
