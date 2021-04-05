import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import IndexPage from './pages/index';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ResetPasswordPage from './pages/reset-password';

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #080c0b;
    --white: #ffffff;
    --gray: #cccccc;
    --light-gray: #f1f0ea;
    --dark-gray: #27282a;
    --green: #25bb41;
    --blue: #2378a9;
    --error-red: #862626;
    --red: #cb2431;
    --font-heading: 'Bebas Neue';
    --font-regular: 'Roboto';
  }
  body {
    background-color: var(--black);
    font-family: var(--font-regular), '-aple-system', 
      'BlinkMacSystemFont', sans-serif;
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
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
