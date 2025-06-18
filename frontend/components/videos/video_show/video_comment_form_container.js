import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import VideoCommentForm from './video_comment_form';
import { createComment } from '../../../actions/comments_actions';

const mapStateToProps = (state) => {
  const currentUserId = state.session.id;
  let currentUser, currentUserAvatarURL;

  if (currentUserId !== null) {
    currentUser = state.entities.users[currentUserId];
    currentUserAvatarURL = currentUser.avatar_url;
  }

  const defaultAvatarURL = 'https://s3.amazonaws.com/individualcylinder-video-upload-dev/default-avatar.png';

  return {
    currentUserId,
    currentUserAvatarURL: currentUserAvatarURL || defaultAvatarURL
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: comment => dispatch(createComment(comment))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoCommentForm)
);
