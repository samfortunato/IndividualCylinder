import { connect } from 'react-redux';

import UserActionsMenu from './user_actions_menu';
import { logOut } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  const { users } = state.entities;
  const { session } = state;
  const currentUser = users[session.id] || null;

  return { currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserActionsMenu);
