import React from 'react';
import { Link } from 'react-router-dom';

import UserActionsMenuButtonContainer from './user_actions_menu_button_container';

class NavHeader extends React.Component {
  render() {
    return (
      <header className="main-header">
        <nav className="global-nav">
          <ul>
            <li><img className="menu-icon" src="https://placeimg.com/24/24/tech" alt="Menu icon" /></li>
            <li>
              <Link className="main-header-logo-home-link" to="/">
                <img className="main-header-logo" src="https://i.imgur.com/k5ZfpMM.png" alt="InvidivualCylinder logo" />
              </Link>
            </li>
          </ul>
        </nav>

        <input type="search"/>

        <nav className="user-actions">
          <ul>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>IndividualCylinder Apps</li>
            <li>Messages</li>
            <li>Settings</li>
            <li><UserActionsMenuButtonContainer /></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavHeader;
