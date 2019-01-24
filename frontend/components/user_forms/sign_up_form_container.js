import { connect } from 'react-redux';

import { createUser } from '../../actions/users_actions';
import SignUpForm from './sign_up_form';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: user => dispatch(createUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
