import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const AuthComponent = ({ component: Component, exact, path, loggedIn }) => {
  return <Route exact={exact} path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
};

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.id)
  };
};

export const AuthRoute = withRouter(connect(
  mapStateToProps
)(AuthComponent));
