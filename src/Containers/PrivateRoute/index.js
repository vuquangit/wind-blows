import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Loading from "../../Template/Pages/Loading";
import { connect } from "react-redux";

const RedirectRoute = props => (
  <Redirect
    to={{
      pathname: "/accounts/emailsignup",
      state: { from: props.location }
    }}
  />
);

const PrivateRoute = ({ component: Component, state, ...rest }) => {
  const isAuthenticated = state.isAuthenticated;
  const isLoading = false;
  // debugger;
  useEffect(
    () => {
      setTimeout(() => {
        if (!isAuthenticated && isLoading) {
          // do signout()
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return !isLoading ? (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <RedirectRoute />
      }
    />
  ) : (
    <Loading />
  );
};

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(PrivateRoute);
