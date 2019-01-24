import { connect } from 'react-redux';

import UserActionsMenu from './user_actions_menu_button';

const mapStateToProps = (state) => {
  const { users } = state.entities;
  const { session } = state;
  const currentUser = users[session.id] || null;

  return { currentUser };
};

export default connect(
  mapStateToProps
)(UserActionsMenu);
