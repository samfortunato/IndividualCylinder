import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import VideoInfo from './video_info';

const mapStateToProps = (state, ownProps) => {
  const _nullVideo = {
    id: null,
    title: '',
    description: '',
    views: null,
    upload_date: '',
    uploader_id: null
  };

  const _nullUploader = {
    id: null,
    first_name: '',
    last_name: '',
    avatar_url: ''
  };
  
  const videoId = ownProps.match.params.id;
  const video = state.entities.videos[videoId] || _nullVideo;
  const uploader = state.entities.users[video.uploader_id] || _nullUploader;

  return {
    currentUserId: state.session.id,
    video,
    uploader
  };
};

export default withRouter(
  connect(mapStateToProps)(VideoInfo)
);
