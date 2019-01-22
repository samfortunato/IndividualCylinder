import { connect } from 'react-redux';

import { createUser } from '../../actions/users_actions';
import SignUpForm from './sign_up';

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user))
  };
};

export default connect(
  mapDispatchToProps
)(SignUpForm);
