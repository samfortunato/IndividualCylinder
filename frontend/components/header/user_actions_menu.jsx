import React from 'react';
import { Link } from 'react-router-dom';

class UserActionsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });

    document.querySelector('html')
      .classList.toggle('no-scroll');
  }

  handleLogOut() {
    this.props.logOut();
    
    document.querySelector('html')
      .classList.remove('no-scroll');
  }
  
  render () {
    const { currentUser } = this.props;
    const { menuOpen } = this.state;
    
    const signInButton = <Link className="sign-in-button" to="/signin">Sign In</Link>;
    const userIcon = currentUser ? (
      <img
        className="user-actions-menu-button"
        src="https://placeimg.com/32/32/people"
        alt={`${currentUser.first_name}'s profile picture`}
        onClick={this.toggleMenu}
      />
    ) : '';

    const userActionsMenuClasses = (
      menuOpen ? 'user-actions-menu' : 'user-actions-menu hidden'
    );

    const transparentModalDivClasses = (
      menuOpen ? 'transparent-modal-click-area' : 'transparent-modal-click-area hidden'
    );
    
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

          <div
            className={transparentModalDivClasses}
            onClick={this.toggleMenu}
          ></div>

          <div className={userActionsMenuClasses}>
            <header className="user-actions-menu-header">
              <img
                className="user-profile-picture"
                src="https://placeimg.com/40/40/people"
                alt={`${currentUser.first_name}'s profile picture`}
              />

              <ul className="user-details">
                <li><h2>{`${currentUser.first_name} ${currentUser.last_name}`}</h2></li>
                <li><h3>{currentUser.email}</h3></li>
              </ul>
            </header>

            <nav>
              <ul>
                <li>
                  <button className="user-actions-menu-option" onClick={this.handleLogOut}>
                    <span>Sign out</span>
                    <span>></span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      );
    }
  }
};

export default UserActionsMenu;
