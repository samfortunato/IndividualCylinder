import React from 'react';
import { withRouter } from 'react-router-dom';

import NavHeader from '../header/nav_header';

class SearchResultsPage extends React.Component {
  render() {
    const searchTerms = this.props.location.search.slice(14);
    
    return (
      <>
        <NavHeader />

        <h1>Search Results</h1>
        <span>Search terms: {searchTerms}</span>
      </>
    );
  }
}

export default withRouter(SearchResultsPage);
