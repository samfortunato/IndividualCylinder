import * as SubscriptionsAPIUtil from '../util/subscriptions_api_util';

export const RECEIVE_SUBSCRIPTION = 'RECEIVE_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';
export const RECEIVE_SUBSCRIPTION_ERRORS = 'RECEIVE_SUBSCRIPTION_ERRORS';

export const createSubscription = (subscription) => (dispatch) => {
  return SubscriptionsAPIUtil.createSubscription(subscription)
    .then(
      subscription => dispatch(receiveSubscription(subscription)),
      errors => dispatch(receiveSubscriptionErrors(errors))
    );
};

export const deleteSubscription = (subscription) => (dispatch) => {
  return SubscriptionsAPIUtil.deleteSubscription(subscription)
    .then(
      subscriptionId => dispatch(removeSubscription(subscriptionId)),
      errors => dispatch(receiveSubscriptionErrors(errors))
    );
};

export const receiveSubscription = (subscription) => {
  return {
    type: RECEIVE_SUBSCRIPTION,
    subscription
  };
};

export const removeSubscription = (subscription) => {
  return {
    type: REMOVE_SUBSCRIPTION,
    subscription
  };
};

export const receiveSubscriptionErrors = (errors) => {
  return {
    type: RECEIVE_SUBSCRIPTION_ERRORS,
    errors
  };
};
