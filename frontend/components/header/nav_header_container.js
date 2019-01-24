import { connect } from 'react-redux';

import { logOut } from '../../actions/session_actions';
import NavHeader from './nav_header';

const mapStateToProps = (state) => {
  // debugger;

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
)(NavHeader);
