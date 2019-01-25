import { connect } from 'react-redux';

import { clearErrors } from '../../actions/session_actions';
import { createUser } from '../../actions/session_actions';
import SignUpForm from './sign_up_form';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    createUser: user => dispatch(createUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
