import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import IndexPage from './pages/index';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ResetPasswordPage from './pages/reset-password';

import CommentSection from './components/comments/section';

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #080c0b;
    --white: #ffffff;
    --gray: #cccccc;
    --light-gray: #f1f0ea;
    --dark-gray: #18191a;
    --green: #0dab76;
    --blue: #2378a9;
    --red: #cb2431;
    --error-red: #8a050c;
    --bg-post: #101816;
    --border-light: #777;
    --font-heading: 'Bebas Neue';
  }
  body {
    background-color: var(--black);
    color: var(--light-gray);
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
        <Route exact path="/comment" component={CommentSection} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
