import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IndexPage from './pages/index/index';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ResetPasswordPage from './pages/reset-password';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/reset-password" component={ResetPasswordPage} />
    </Switch>
  </Router>
);

export default App;
