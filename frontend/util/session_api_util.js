export const logInUser = (user) => {
  return $.ajax({
    url: 'api/session',
    method: 'POST',
    data: { user }
  });
};

export const logOut = () => {
  return $.ajax({
    url: 'api/session',
    method: 'DELETE'
  });
};
