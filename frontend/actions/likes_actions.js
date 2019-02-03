import * as LikesAPIUtil from '../util/likes_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const RECEIVE_LIKE_ERRORS = 'RECEIVE_LIKE_ERRORS';

export const createLike = (like) => (dispatch) => {
  return LikesAPIUtil.createLike(like)
    .then(
      like => dispatch(receiveLike(like)),
      errors => dispatch(receiveLikeErrors(errors))
    );
};

export const updateLike = (like) => (dispatch) => {
  return LikesAPIUtil.updateLike(like)
    .then(
      like => dispatch(receiveLike(like)),
      errors => dispatch(receiveLikeErrors(errors))
    );
};

export const deleteLike = (id) => (dispatch) => {
  return LikesAPIUtil.deleteLike(id)
    .then(
      like => dispatch(removeLike(like)),
      errors => dispatch(receiveLikeErrors(errors))
    );
};

export const receiveLike = (like) => {
  return {
    type: RECEIVE_LIKE,
    like
  };
};

export const removeLike = (like) => {
  return {
    type: REMOVE_LIKE,
    like
  };
};

export const receiveLikeErrors = (errors) => {
  return {
    type: RECEIVE_LIKE_ERRORS,
    errors
  };
};
