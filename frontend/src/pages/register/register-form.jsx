import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import {
  AuthForm,
  AuthInput,
  AuthSignUpButton,
  AuthErrorBlock,
} from '../../components/styled/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleInput = async event => {
    event.preventDefault();
    try {
      await AuthService.register(email, username, password);
      history.push('/login');
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
        <label htmlFor="register__username">Username</label>
        <AuthInput
          id="register__username"
          type="text"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="register__email">Email address</label>
        <AuthInput
          id="register__email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="register__password">Password</label>
        <AuthInput
          id="register__password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span>
          Make sure it&apos;s at least 8 characters including a number and a
          lowercase letter.
        </span>
        <AuthSignUpButton>Create an account</AuthSignUpButton>
      </AuthForm>
    </FormWrapper>
  );
};

export default RegisterForm;

const FormWrapper = styled.div`
  width: 530px;
  margin: 0 auto;
  @media screen and (max-width: 576px) {
    width: calc(100% - 50px);
  }
  ${AuthErrorBlock} {
    margin-bottom: 25px;
  }
  label::after {
    content: ' *';
    color: var(--red);
    font-weight: 700;
  }
  span {
    color: #ddd;
    margin-top: -10px;
    margin-bottom: 30px;
    font-size: 13px;
  }
`;
