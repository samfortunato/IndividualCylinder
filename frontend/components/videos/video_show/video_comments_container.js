import { connect } from 'react-redux';

import VideoComments from './video_comments';
import { deleteComment } from '../../../actions/comments_actions';

const mapStateToProps = (state) => {
  return {
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: id => dispatch(deleteComment(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoComments);
