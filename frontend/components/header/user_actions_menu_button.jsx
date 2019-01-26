import React from 'react';
import { Link } from 'react-router-dom';

import UserActionsMenuContainer from './user_actions_menu_container';

class UserActionsMenuButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };

    this.displayMenu = this.displayMenu.bind(this);
  }
  
  displayMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
    console.log(this.state.menuOpen);
  }
  
  render () {
    const { currentUser } = this.props;
    
    const signInButton = <Link className="sign-in-button" to="/signin">Sign In</Link>;
    const userIcon = currentUser ? (
      <img
        className="user-actions-menu-button"
        src="https://placeimg.com/32/32/people"
        alt={`${currentUser.first_name}'s profile picture`}
        onClick={this.displayMenu}
      />
    ) : '';
    
    if (!currentUser) {
      return (
        <>
          {signInButton}
        </>
      );
    } else {
      return (
        <>
          {userIcon}
          <UserActionsMenuContainer
            currentUser={this.props.currentUser}
            open={this.state.menuOpen}
          />
        </>
      )
    }
  }
};

export default UserActionsMenuButton;
