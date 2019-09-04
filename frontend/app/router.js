import React from "react";
import PropTypes from "prop-types";
import Auth from "app/auth/auth-context";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteConsumer = ({
  isAuthenticated,
  props: { component: Component, ...otherRouteProps }
}) => {
  return (
    <Route
      {...otherRouteProps}
      render={props => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        );
      }}
    />
  );
};
PrivateRouteConsumer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  props: PropTypes.shape({
    component: PropTypes.func
  })
};

const PrivateRoute = props => (
  <Auth.Consumer>
    {authProps => <PrivateRouteConsumer props={props} {...authProps} />}
  </Auth.Consumer>
);

export default PrivateRoute;
