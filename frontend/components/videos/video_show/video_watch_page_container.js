import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import VideoWatchPage from './video_watch_page';
import { fetchVideo } from '../../../actions/videos_actions';

const mapStateToProps = (state, ownProps) => {
  debugger;
  
  const videoId = ownProps.match.params.id;
  const video = state.entities.videos[videoId] || {};

  const comments = video.comment_ids.map((id) => {
    if (state.entities.comments[id]) {
      return state.entities.comments[id];
    }
  });

  return { video, comments };
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
