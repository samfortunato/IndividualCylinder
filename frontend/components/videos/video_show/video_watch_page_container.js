import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import VideoWatchPage from './video_watch_page';
import { fetchVideo } from '../../../actions/videos_actions';

const mapStateToProps = (state, ownProps) => {
  const _nullVideo = {
    comment_ids: []
  };
  
  const videoId = ownProps.match.params.id;
  const video = state.entities.videos[videoId] || _nullVideo;

  let commentIds = video.comment_ids || [];

  const comments = commentIds.map((id) => {
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
