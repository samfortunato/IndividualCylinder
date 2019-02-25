import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerms: ''
    };

    this.handleSearchTerms = this.handleSearchTerms.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchTerms(e) {
    this.setState({ searchTerms: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();

    const queryString = `?search_query=${this.state.searchTerms}`;
    this.props.history.push(`/results${queryString}`);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="search-bar"
          type="search"
          value={this.state.searchTerms}
          onChange={this.handleSearchTerms}
        />
        
        <button id="search-button">
          <i className="fas fa-search"></i>
        </button>
      </form>
    );
  }
}

export default withRouter(SearchBar);
