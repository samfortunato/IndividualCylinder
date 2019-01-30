import { connect } from 'react-redux';

import VideosIndex from './videos_index';
import { fetchAllVideos } from '../../../actions/videos_actions';

const mapStateToProps = (state) => {
  return {
    allVideos: Object.values(state.entities.videos)
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
