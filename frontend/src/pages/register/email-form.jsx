import React from 'react';
import styled from 'styled-components';
import GoogleButton from '../../components/google-button';
import GitHubButton from '../../components/github-button';
import { LightDivider } from '../../components/styled/divider';
import {
  AuthFormContent,
  AuthInput,
  AuthSignUpButton,
} from '../../components/styled/auth';

export const EmailForm = ({ state, updateState, updateStep, setError }) => {
  const handleLocalRegister = event => {
    event.preventDefault();
    const letterNumber8Symbols = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
    state.password.match(letterNumber8Symbols)
      ? updateStep(+1)
      : setError(
          'The password must be at least 8 characters long, including a number and a letter'
        );
  };

  const handleExternalRegister = (authProvider, authCode) => {
    updateState({ authProvider, authCode });
    updateStep(+1);
  };

  return (
    <FormContent>
      <label htmlFor="email">Email address</label>
      <AuthInput
        id="email"
        type="email"
        maxLength="255"
        required
        value={state.email}
        onChange={e => updateState({ email: e.target.value.trim() })}
      />
      <label htmlFor="password">Password</label>
      <AuthInput
        id="password"
        type="password"
        maxLength="128"
        required
        value={state.password}
        onChange={e => updateState({ password: e.target.value.trim() })}
      />
      <span>
        Make sure it&apos;s at least 8 characters including a number and a
        letter.
      </span>
      <AuthSignUpButton onClick={handleLocalRegister}>
        Create an account
      </AuthSignUpButton>
      <LightDivider>OR</LightDivider>
      <GoogleButton
        buttonText="Sign up with Google"
        onSuccess={res => handleExternalRegister('google', res.code)}
        onFailure={res => console.log(res)}
      />
      <GitHubButton
        buttonText="Sign up with GitHub"
        onSuccess={res => handleExternalRegister('github', res.code)}
        onFailure={res => console.log(res)}
      />
    </FormContent>
  );
};

const FormContent = styled(AuthFormContent)`
  ${LightDivider} {
    margin: 15px 0;
  }
  span {
    margin-top: -10px;
    margin-bottom: 30px;
    font-size: 13px;
  }
  button:nth-of-type(2) {
    margin-bottom: 15px;
  }
`;
