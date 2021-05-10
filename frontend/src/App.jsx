import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import IndexPage from './pages/index';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ResetPasswordPage from './pages/reset-password';
import UserPage from './pages/user';

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #080c0b;
    --white: #f1f0ea;
    --gray: #ccc;
    --gray-dark: #18191a;
    --green: #0dab76;
    --blue: #2378a9;
    --red: #cb2431;
    --error-red: #8a050c;
    --bg-post: #101816;
    --border-dark: #333;
    --border-light: #777;
    --font-heading: 'Bebas Neue';
  }
  body {
    background-color: var(--black);
    color: var(--white);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
      'Roboto', 'Cantarell', sans-serif;
  }
`;

const App = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route path="/:username" component={UserPage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
