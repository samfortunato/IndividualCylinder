import * as CommentsAPIUtil from '../util/comments_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';

export const createComment = (comment) => (dispatch) => {
  return CommentsAPIUtil.createComment(comment)
    .then(
      comment => dispatch(receiveComment(comment)),
      errors => dispatch(receiveCommentErrors(errors))
    );
};

export const fetchComment = (id) => (dispatch) => {
  return CommentsAPIUtil.fetchComment(id)
    .then(
      comment => dispatch(receiveComment(comment)),
      errors => dispatch(receiveCommentErrors(errors))
    );
};

export const updateComment = (comment) => (dispatch) => {
  return CommentsAPIUtil.updateComment(comment)
    .then(
      comment => dispatch(receiveComment(comment)),
      errors => dispatch(receiveCommentErrors(errors))
    );
};

export const deleteComment = (id) => (dispatch) => {
  return CommentsAPIUtil.deleteComment(id)
    .then(
      comment => dispatch(removeComment(comment)),
      errors => dispatch(receiveCommentErrors(errors))
    );
};

export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment
  };
};

export const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    comment
  };
};

export const receiveCommentErrors = (errors) => {
  return {
    type: RECEIVE_COMMENT_ERRORS,
    errors
  };
};

export const clearCommentErrors = () => {
  return {
    type: CLEAR_COMMENT_ERRORS
  };
};
