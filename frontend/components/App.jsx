import React from 'react';
import { Route } from 'react-router-dom';

import { AuthRoute } from '../util/route_util';

import NavHeaderContainer from './header/nav_header_container';
import SignUpFormContainer from './user_forms/sign_up_form_container';
import SignInFormContainer from './user_forms/sign_in_form_container';

export default (props) => {
  return (
    <>
      <Route exact path="/" component={NavHeaderContainer} />
      <AuthRoute path="/signup" component={SignUpFormContainer} />
      <AuthRoute path="/signin" component={SignInFormContainer} />
    </>
  );
};
