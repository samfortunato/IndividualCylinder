export const createUser = (user) => {
  return $.ajax({
    url: 'api/users',
    method: 'POST',
    data: {
      user: user
    }
  });
};

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
