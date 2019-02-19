import merge from 'lodash/merge';

import {
  RECEIVE_CHANNEL
} from '../actions/channels_actions';

import {
  RECEIVE_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION
} from '../actions/subscriptions_actions';

const channelsReducer = (currentState = {}, action) => {
  Object.freeze(currentState);

  switch (action.type) {
    case RECEIVE_CHANNEL: {
      return merge({}, currentState, action.channel);
    }

    case RECEIVE_SUBSCRIPTION: {
      let nextState = merge({}, currentState);
      const { channel_id: channelId } = action.subscription;
      
      nextState[channelId].current_user_is_subscribed = true;
      nextState[channelId].subscriber_amount++;
      
      return nextState;
    }

    case REMOVE_SUBSCRIPTION: {
      let nextState = merge({}, currentState);
      const { channel_id: channelId } = action.subscription;

      nextState[channelId].current_user_is_subscribed = false;
      nextState[channelId].subscriber_amount--;

      return nextState;
    }
    
    default:
      return currentState;
  }
};

export default channelsReducer;
