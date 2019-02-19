export const createSubscription = (subscription) => {
  return $.ajax({
    url: 'api/subscriptions',
    method: 'POST',
    data: subscription
  });
};

export const deleteSubscription = (subscriptionId) => {
  return $.ajax({
    url: `api/subscriptions/${subscriptionId}`,
    method: 'DELETE'
  });
};
