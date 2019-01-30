import { connect } from 'react-redux';

import VideoUploadForm from './video_upload_form';
import {
  uploadVideo,
  clearVideoErrors
} from '../../../actions/videos_actions';

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.id,
    errors: state.errors.videos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadVideo: video => dispatch(uploadVideo(video)),
    clearVideoErrors: () => dispatch(clearVideoErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoUploadForm);
