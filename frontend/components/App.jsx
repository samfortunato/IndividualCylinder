import React from 'react';
import { Route } from 'react-router-dom';

import SignUpForm from './user_forms/sign_up';

export default (props) => {
  return (
    <>
      <h1>sup</h1>
      <a href="https://youtu.be/oGRqCq3LccI">click here to win $100000000000000000</a>
    
      <Route exact path="/" />
      <Route path="/signup" component={SignUpForm} />
    </>
  );
};
