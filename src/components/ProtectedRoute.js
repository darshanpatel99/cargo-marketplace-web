import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
    component: Component,
    isAuthenticated,
    isVerifying,
    ...rest
  }) => (
    <Route
      {...rest}
      render={props =>
        isVerifying ? (
          <div />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location, item: props.location.state }
            }}
          />
        )

      }
    />
  );
  export default ProtectedRoute;