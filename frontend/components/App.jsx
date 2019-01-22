import React from 'react';
import { Route } from 'react-router-dom';

import SignUpForm from './user_forms/sign_up';

export default (props) => {
  return (
    <>
      <h1>sup</h1>
    
      <Route exact path="/" />
      <Route path="/signup" component={SignUpForm} />
    </>
  );
};
