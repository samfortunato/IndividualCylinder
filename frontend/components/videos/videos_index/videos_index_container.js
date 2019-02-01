import { connect } from 'react-redux';

import VideosIndex from './videos_index';
import { fetchAllVideos } from '../../../actions/videos_actions';

const mapStateToProps = (state) => {
  const allVideos = Object.values(state.entities.videos);
  
  return {
    allVideos,
    uploaders: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllVideos: () => dispatch(fetchAllVideos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideosIndex);
