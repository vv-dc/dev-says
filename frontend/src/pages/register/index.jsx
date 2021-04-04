import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import RegisterForm from './register-form';

const RegisterPage = () =>
  !AuthService.isAuthenticated() ? (
    <RegisterBody>
      <h1>Register</h1>
      <RegisterForm />
      <Link to="/login">Login</Link>
    </RegisterBody>
  ) : (
    <Redirect to="/" />
  );

export default RegisterPage;

const RegisterBody = styled.div``;
