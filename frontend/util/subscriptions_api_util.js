export const createSubscription = (subscription) => {
  return $.ajax({
    url: 'api/subscriptions',
    method: 'POST',
    data: { subscription }
  });
};

export const deleteSubscription = (subscription) => {
  return $.ajax({
    url: `api/subscriptions/delete`,
    method: 'DELETE',
    data: { subscription }
  });
};
