import merge from 'lodash/merge';

import { RECEIVE_VIDEO } from '../actions/videos_actions';

const videosReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_VIDEO: {
      let nextState = merge({}, currentState, action.video);

      return nextState;
    }

    default:
      return currentState;
  }
};

export default videosReducer;
