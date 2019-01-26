import { connect } from 'react-redux';

import VideoPlayer from './video_player';
import { fetchVideo } from '../../actions/videos_actions';

const mapStateToProps = (state, ownProps) => {
  debugger;

  const _nullVideo = {
    id: null,
    title: '',
    description: '',
    videoUrl: ''
  };

  const video = state.entities.videos[ownProps.videoId] || _nullVideo;

  return { video };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideo: (id) => dispatch(fetchVideo(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer);
