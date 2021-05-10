import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import LoginForm from './login-form';
import AuthHeader from '../../components/auth-header';
import { AuthLink } from '../../components/styled/auth';

const LoginPage = () =>
  !AuthService.isAuthenticated() ? (
    <LoginBody>
      <AuthHeader body="Sign in to DevSays" />
      <LoginForm />
      <AuthLink>
        <span>New to DevSays?</span>
        <Link to="/register">Create new account</Link>
      </AuthLink>
    </LoginBody>
  ) : (
    <Redirect to="/" />
  );

export default LoginPage;

const LoginBody = styled.div`
  font-size: 14px;
  ${AuthLink} {
    margin-top: 25px;
  }
`;
