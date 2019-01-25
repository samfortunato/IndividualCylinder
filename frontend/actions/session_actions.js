import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOG_OUT_CURRENT_USER = 'LOG_OUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

export const createUser = (user) => (dispatch) => {
  return SessionAPIUtil.createUser(user)
    .then(
      (currentUser => dispatch(receiveCurrentUser(currentUser))),
      (errors => dispatch(receiveErrors(errors)))
    );
};

export const logInUser = (user) => (dispatch) => {
  return SessionAPIUtil.logInUser(user)
    .then(
      (currentUser => dispatch(receiveCurrentUser(currentUser))),
      (errors => dispatch(receiveErrors(errors)))
    );
};

export const logOut = () => (dispatch) => {
  return SessionAPIUtil.logOut()
    .then(
      (() => dispatch(logOutCurrentUser())),
      (errors => dispatch(receiveErrors(errors)))
    );
};

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const logOutCurrentUser = () => {
  return {
    type: LOG_OUT_CURRENT_USER
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS
  };
};
