import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import VideoEditForm from './video_edit_form';
import { updateVideo } from '../../../actions/videos_actions';

const mapDispatchToProps = (dispatch) => {
  return {
    updateVideo: video => dispatch(updateVideo(video))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(VideoEditForm)
);
