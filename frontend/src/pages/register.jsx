import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RegisterForm from '../components/register-form';
import AuthHeader from '../components/auth-header';
import { AuthLink } from '../components/styled/auth';

const RegisterPage = () => (
  <RegisterBody>
    <AuthHeader body="Create new account" />
    <RegisterForm />
    <AuthLink>
      <span>Already have an account?</span>
      <Link to="/login">Sign in</Link>
    </AuthLink>
  </RegisterBody>
);

export default RegisterPage;

const RegisterBody = styled.div`
  font-size: 15px;
  ${AuthLink} {
    margin-top: 35px;
  }
`;
