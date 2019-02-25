import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NavHeader from '../header/nav_header';
import { searchVideos } from '../../actions/search_actions';
import VideoCardLong from '../videos/video_card/video_card_long';

class SearchResultsPage extends React.Component {
  constructor() {
    super();
    this.runSearch = this.runSearch.bind(this);
  }
  
  runSearch() {
    const searchTerms = this.props.location.search.slice(14);
    this.props.searchVideos({ search_terms: searchTerms });
  }
  
  componentDidMount() {
    this.runSearch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.runSearch();
    }
  }
  
  render() {
    const { matchingVideos, users } = this.props;
    const videoCards = matchingVideos.map((video, id) => {
        return (
          <VideoCardLong
            key={id}
            video={video}
            uploader={users[video.uploader_id]}
          />
        );
    });
    
    return (
      <>
        <NavHeader />

        <ul id="search-results">
          {videoCards}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { search_results } = state.entities;
  let matchingVideos = [];

  if (search_results.video_ids) {
    matchingVideos = search_results.video_ids.map((id) => {
      return state.entities.videos[id];
    });
  }

  return {
    matchingVideos,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchVideos: searchTerms => dispatch(searchVideos(searchTerms))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchResultsPage)
);
