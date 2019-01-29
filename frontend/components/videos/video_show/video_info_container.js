import { connect } from 'react-redux';

import VideoInfo from './video_info';

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id
  };
};

export default connect(
  mapStateToProps
)(VideoInfo);
