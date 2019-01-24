import React from 'react';
import { Route } from 'react-router-dom';

import NavHeaderContainer from './header/nav_header_container';
import SignUpFormContainer from './user_forms/sign_up_form_container';
import SignInFormContainer from './user_forms/sign_in_form_container';

export default (props) => {
  return (
    <>
      <Route exact path="/" component={NavHeaderContainer} />
      <Route path="/signup" component={SignUpFormContainer} />
      <Route path="/signin" component={SignInFormContainer} />
    </>
  );
};
