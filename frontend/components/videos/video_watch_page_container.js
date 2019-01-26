import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import VideoWatchPage from './video_watch_page';
import { fetchVideo } from '../../actions/videos_actions';

const mapStateToProps = (state, ownProps) => {
  const _nullVideo = {
    id: null,
    title: '',
    description: '',
    videoUrl: ''
  };

  debugger;

  const videoId = ownProps.match.params.id;

  const video = state.entities.videos[videoId] || _nullVideo;

  return { video };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideo: (id) => dispatch(fetchVideo(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoWatchPage)
);
