import * as SessionAPIUtil from '../util/session_api_util';

export const LOG_IN_USER = 'LOG_IN_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export const logInUser = (user) => (dispatch) => {
  return SessionAPIUtil.logInUser(user)
    .then(user => dispatch({
      type: LOG_IN_USER,
      user
    }));
};

export const logOut = () => (dispatch) => {
  return SessionAPIUtil.logOut()
    .then(() => dispatch({
      type: LOG_OUT_USER
    }));
};
