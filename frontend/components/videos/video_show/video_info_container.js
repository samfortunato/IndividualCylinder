import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import VideoInfo from './video_info';

const mapStateToProps = (state, ownProps) => {
  const videoId = ownProps.match.params.id;
  const video = state.entities.video[videoId] || {};
  const uploader = (
    !video ? {} : state.entities.users[video.uploader_id]
  );

  return {
    currentUserId: state.session.id,
    video,
    uploader
  };
};

export default withRouter(
  connect(mapStateToProps)(VideoInfo)
);
