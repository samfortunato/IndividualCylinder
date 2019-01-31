import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import VideoCommentForm from './video_comment_form';
import { createComment } from '../../../actions/comments_actions';

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: comment => dispatch(createComment(comment))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(VideoCommentForm)
);
