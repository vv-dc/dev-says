import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Logout from './logout';
import ResetPassword from './reset-password';

const Authentication = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/reset" component={ResetPassword} />
  </Switch>
);

export default Authentication;
