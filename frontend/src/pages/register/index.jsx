import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import RegisterForm from './register-form';
import AuthHeader from '../../components/auth-header';
import { AuthLink } from '../../components/styled/auth';

const RegisterPage = () =>
  !AuthService.isAuthenticated() ? (
    <RegisterBody>
      <AuthHeader body="Create new account" />
      <RegisterForm />
      <AuthLink>
        <span>Already have an account?</span>
        <Link to="/login">Sign in</Link>
      </AuthLink>
    </RegisterBody>
  ) : (
    <Redirect to="/" />
  );

export default RegisterPage;

const RegisterBody = styled.div`
  font-size: 15px;
  ${AuthLink} {
    margin-top: 35px;
  }
`;
