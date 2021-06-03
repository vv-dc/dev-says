import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { AuthService } from './services/auth.service';
import IndexPage from './pages/index';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ResetPasswordPage from './pages/reset-password';
import UserPage from './pages/user';
import Spinner from './components/shared/spinner';
import AuthRoute from './components/shared/auth-route';

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
    --bg-dots: rgba(13, 171, 118, 0.1);
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

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AuthService.refreshTokens().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? (
        <Spinner height={300} width={300} />
      ) : (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <AuthRoute exact path="/register" component={RegisterPage} />
            <AuthRoute exact path="/login" component={LoginPage} />
            <AuthRoute
              exact
              path="/reset-password"
              component={ResetPasswordPage}
            />
            <Route
              exact
              path="/:username"
              component={() => <UserPage key={location.pathname} />}
            />
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
