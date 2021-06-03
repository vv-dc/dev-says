import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from '../components/login-form';
import AuthHeader from '../components/auth-header';
import { AuthLink } from '../components/styled/auth';

const LoginPage = () => (
  <LoginBody>
    <AuthHeader body="Sign in to DevSays" />
    <LoginForm />
    <AuthLink>
      <span>New to DevSays?</span>
      <Link to="/register">Create new account</Link>
    </AuthLink>
  </LoginBody>
);

export default LoginPage;

const LoginBody = styled.div`
  font-size: 14px;
  ${AuthLink} {
    margin-top: 25px;
  }
`;
