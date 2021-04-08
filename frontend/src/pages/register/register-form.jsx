import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import GoogleButton from '../../components/google-button';
import GitHubButton from '../../components/github-button';
import { LightDivider } from '../../components/styled/divider';
import {
  AuthForm,
  AuthInput,
  AuthSignUpButton,
  AuthErrorBlock,
} from '../../components/styled/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const isValidForm = () => {
    if (!password.match('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'))
      setError(
        'Password should contain at least 8 characters including a number and a letter'
      );
    return error ? false : true;
  };

  const handleExternalRegister = (service, { code }) => {
    AuthService.registerExternal(service, code, code)
      .then(() => history.push('/login'))
      .catch(err => setError(err.message));
  };

  const handleRegister = () =>
    AuthService.register(email, email, password)
      .then(() => history.push('/login'))
      .catch(err => setError(err.message));

  const handleInput = event => {
    event.preventDefault();
    isValidForm() && handleRegister();
  };

  return (
    <FormWrapper>
      {error ? (
        <AuthErrorBlock onClick={() => setError('')}>{error}</AuthErrorBlock>
      ) : null}
      <AuthForm onSubmit={handleInput}>
        <label htmlFor="register__email">Email address</label>
        <AuthInput
          id="register__email"
          type="email"
          maxLength="255"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="register__password">Password</label>
        <AuthInput
          id="register__password"
          type="password"
          maxLength="128"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span>
          Make sure it&apos;s at least 8 characters including a number and a
          letter.
        </span>
        <AuthSignUpButton>Create an account</AuthSignUpButton>
        <LightDivider>OR</LightDivider>
        <GoogleButton
          buttonText="Sign up with Google"
          onSuccess={res => handleExternalRegister('google', res)}
          onFailure={res => console.log(res)}
        />
        <GitHubButton
          buttonText="Sign up with GitHub"
          onSuccess={res => handleExternalRegister('github', res)}
          onFailure={res => console.log(res)}
        />
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
  ${LightDivider} {
    padding: 18px 0;
  }
  label:after {
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
  button:nth-of-type(2) {
    margin-bottom: 15px;
  }
`;
