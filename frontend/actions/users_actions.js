import * as UsersAPIUtil from '../util/users_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';

export const createUser = (user) => (dispatch) => {
  return UsersAPIUtil.createUser(user)
    .then(user => dispatch({
      type: RECEIVE_USER,
      user
    }));
};
