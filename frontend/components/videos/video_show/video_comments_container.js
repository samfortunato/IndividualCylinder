import { connect } from 'react-redux';

import VideoComments from './video_comments';
import {
  updateComment,
  deleteComment
} from '../../../actions/comments_actions';

const mapStateToProps = (state) => {
  return {
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateComment: comment => dispatch(updateComment(comment)),
    deleteComment: id => dispatch(deleteComment(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoComments);
