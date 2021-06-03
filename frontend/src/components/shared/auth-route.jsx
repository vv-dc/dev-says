import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthService } from '../../services/auth.service';

const AuthRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={props =>
      AuthService.isAuthenticated() ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default AuthRoute;
