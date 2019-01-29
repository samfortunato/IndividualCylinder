import * as UsersAPIUtil from '../util/users_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

export const fetchUser = (id) => (dispatch) => {
  return UsersAPIUtil.fetchUser(id)
    .then(
      (user) => dispatch(receiveUser(user))
    );
};

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const receiveUserErrors = (errors) => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors
  };
};
