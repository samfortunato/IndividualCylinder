import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const LoggedInAuthComponent = ({ component: Component, exact, path, loggedIn }) => {
  return <Route exact={exact} path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
};

const LogInAuthComponent = ({ component: Component, exact, path, loggedIn }) => {
  return <Route exact={exact} path={path} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/signin" />
    )
  )} />
};

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.id),
  };
};

export const LoggedInAuthRoute = withRouter(
  connect(mapStateToProps)(LoggedInAuthComponent)
);

export const LogInAuthRoute = withRouter(
  connect(mapStateToProps)(LogInAuthComponent)
);
