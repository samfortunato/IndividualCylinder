import merge from 'lodash/merge';

import {
  RECEIVE_CHANNEL
} from '../actions/channels_actions';

const channelsReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_CHANNEL: {
      return merge({}, currentState, action.channel);
    }
    
    default:
      return currentState;
  }
};

export default channelsReducer;
