import React from 'react';

class SearchBar extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }
  
  render() {
    return (
      <>
        <input id="search-bar" type="search" />
        
        <button id="search-button" onSubmit={this.handleSubmit}>
          <i className="fas fa-search"></i>
        </button>
      </>
    );
  }
}

export default SearchBar;
