import { connect } from 'react-redux';

import VideoComments from './video_comments';

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.entities.users
  };
};

export default connect(mapStateToProps)(VideoComments);
