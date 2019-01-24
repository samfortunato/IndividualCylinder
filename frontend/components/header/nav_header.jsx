import React from 'react';

import UserActionsMenuButtonContainer from './user_actions_menu_button_container';

class NavHeader extends React.Component {
  render() {
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
            <li><UserActionsMenuButtonContainer /></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavHeader;
