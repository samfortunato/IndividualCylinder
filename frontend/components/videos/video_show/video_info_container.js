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
    avatar_url: '',
    subscriber_amount: 0,
    current_user_is_subscribed: false
  };
  
  const videoId = ownProps.match.params.id;
  const video = state.entities.videos[videoId] || _nullVideo;
  const uploader = state.entities.users[video.uploader_id] || _nullUploader;
  const currentUserIsSubscribed = uploader.current_user_is_subscribed;

  return {
    currentUserId: state.session.id,
    video,
    uploader,
    currentUserIsSubscribed
  };
};

export default withRouter(
  connect(mapStateToProps)(VideoInfo)
);
