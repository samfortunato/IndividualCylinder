import { RECEIVE_SUBSCRIPTION_ERRORS } from '../actions/subscriptions_actions';

const subscriptionErrorsReducer = (currentState = [], action) => {
  Object.freeze(currentState);
  
  switch (action.type) {
    case RECEIVE_SUBSCRIPTION_ERRORS:
      return action.errors;

    default:
      return currentState;
  }
};

export default subscriptionErrorsReducer;
