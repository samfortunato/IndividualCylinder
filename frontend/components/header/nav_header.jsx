import React from 'react';
import { Link } from 'react-router-dom';

import UserActionsMenuContainer from './user_actions_menu_container';

class NavHeader extends React.Component {
  render() {
    return (
      <header className="main-header">
        <nav className="global-nav">
          <ul>
            <li><i className="fas fa-bars"></i></li>
            <li>
              <Link className="main-header-logo-home-link" to="/">
                <img className="main-header-logo" src="https://i.imgur.com/k5ZfpMM.png" alt="InvidivualCylinder logo" />
              </Link>
            </li>
          </ul>
        </nav>

        <input id="search-bar" type="search"/>
        <button id="search-button">
          <i class="fas fa-search"></i>
        </button>

        <nav className="user-actions">
          <ul>
            <li>
              <Link to="/upload"><i className="fas fa-video"></i></Link>
            </li>
            <li><UserActionsMenuContainer /></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavHeader;
