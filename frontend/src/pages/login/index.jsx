import React from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import LoginForm from './login-form';

const LoginPage = () =>
  !AuthService.isAuthenticated() ? (
    <LoginBody>
      <LoginHeader>
        <h1>
          <Link to="/">DevSays</Link>
        </h1>
        <h2>Sign in to DevSays</h2>
      </LoginHeader>
      <LoginForm />
      <LoginLink>
        <span>New to DevSays?</span>
        <Link to="/register">Create new account</Link>
      </LoginLink>
    </LoginBody>
  ) : (
    <Redirect to="/" />
  );

export default LoginPage;

const LoginBody = styled.div`
  height: 100vh;
  font-size: 14px;
  color: ${props => props.theme.colors.lightGray};
  background-color: ${props => props.theme.colors.black};
`;

const LoginHeader = styled.header`
  text-align: center;
  color: ${props => props.theme.colors.lightGray};
  padding: 60px 0 35px 0;
  h1 {
    font-family: 'Bebas Neue';
    font-size: 48px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 32px;
    font-weight: 100;
  }
`;

const LoginLink = styled.div`
  margin-top: 25px;
  text-align: center;
  a {
    margin-left: 5px;
    color: ${props => props.theme.colors.blue};
  }
`;
