import { connect } from 'react-redux';

import { logInUser } from '../../actions/session_actions';
import SignInForm from './sign_in_form';

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: user => dispatch(logInUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);
