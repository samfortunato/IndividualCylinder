import React from 'react';
import { Link } from 'react-router-dom';

class NavHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const signInLink = <Link to="/signin">Sign In</Link>;
    const signedInButton = (
      <button onClick={this.props.logOut} >Sign Out</button>
    );
    
    return (
      <header className="main-header">
        <nav className="global-nav">
          <ul>
            <li><img className="menu-icon" src="https://placeimg.com/24/24/tech" alt="Menu icon" /></li>
            <li><img src="https://placeimg.com/80/24/tech" alt="InvidivualCylinder logo" /></li>
          </ul>
        </nav>

        <input type="search"/>

        <nav className="user-actions">
          <ul>
            <li>Upload</li>
            <li>IndividualCylinder Apps</li>
            <li>Messages</li>
            <li>Settings</li>
            <li>{this.props.currentUser === null ? signInLink : signedInButton}</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavHeader;
