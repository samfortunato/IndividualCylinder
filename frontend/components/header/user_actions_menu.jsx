import React from 'react';

class UserActionsMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser, open } = this.props;
    
    const userActionsMenuClasses = (
      open ? 'user-actions-menu' : 'user-actions-menu hidden'
    );
    
    return (
      <div className={userActionsMenuClasses}>
        <header className="user-actions-menu-header">
          <img className="user-profile-picture" src="https://placeimg.com/40/40/people" alt={`${currentUser.first_name}'s profile picture`}/>
          
          <ul className="user-details">
            <li><h2>{`${currentUser.first_name} ${currentUser.last_name}`}</h2></li>
            <li><h3>{currentUser.email}</h3></li>
          </ul>
        </header>

        <nav>
          <ul>
            <li>
              <button className="user-actions-menu-option" onClick={this.props.logOut}>
                <span>Sign out</span>
                <span>></span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default UserActionsMenu;
