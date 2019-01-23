import React from 'react';
import { Route } from 'react-router-dom';

import SignUpFormContainer from './user_forms/sign_up_form_container';
import SignInFormContainer from './user_forms/sign_in_form_container';

export default (props) => {
  return (
    <>
      <h1>IndividualCylinder</h1>
    
      <Route exact path="/" />
      <Route path="/signup" component={SignUpFormContainer} />
      <Route path="/signin" component={SignInFormContainer} />
    </>
  );
};
