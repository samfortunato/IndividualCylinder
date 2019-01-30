import { connect } from 'react-redux';

import VideoEditPage from './video_edit_page';
import { fetchVideo } from '../../../actions/videos_actions';

const mapStateToProps = (state, ownProps) => {
  const videoId = ownProps.match.params.id;

  const _nullVideo = {
    title: '',
    description: '',
    videoURL: '',
    videoThumbnailURL: ''
  };

  return state.entities.videos[videoId] || _nullVideo;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideo: id => dispatch(fetchVideo(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoEditPage);
