import { connect } from 'react-redux';

import { logInUser, clearErrors } from '../../actions/session_actions';
import SignInForm from './sign_in_form';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    logInUser: user => dispatch(logInUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
