import { connect } from 'react-redux';

import { logOut } from '../../actions/session_actions';
import UserActionsMenu from './user_actions_menu';

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserActionsMenu);
