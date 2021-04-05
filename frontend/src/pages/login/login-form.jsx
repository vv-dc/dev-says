import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import {
  AuthForm,
  AuthInput,
  AuthSignInButton,
  AuthErrorBlock,
} from '../../components/styled/auth';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleInput = async event => {
    event.preventDefault();
    try {
      await AuthService.login(login, password);
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <FormWrapper>
      {error ? (
        <AuthErrorBlock onClick={() => setError('')}>{error}</AuthErrorBlock>
      ) : null}
      <AuthForm onSubmit={handleInput}>
        <label htmlFor="login__login">Username or email address</label>
        <AuthInput
          id="login__login"
          type="text"
          required
          maxLength="255"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <label htmlFor="login__password">
          Password
          <Link to="/reset-password" tabIndex="-1">
            Forgot password?
          </Link>
        </label>
        <AuthInput
          id="login__password"
          type="password"
          required
          maxLength="30"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <AuthSignInButton>Sign in</AuthSignInButton>
      </AuthForm>
    </FormWrapper>
  );
};

export default LoginForm;

const FormWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  ${AuthErrorBlock} {
    margin-bottom: 25px;
  }
  ${AuthForm} {
    padding: 30px;
    border: 1px solid #777;
  }
  ${AuthSignInButton} {
    margin-top: 5px;
  }
  a {
    float: right;
    color: var(--blue);
  }
`;
