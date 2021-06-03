import React from 'react';
import styled from 'styled-components';
import { AuthFormContent, AuthInput, AuthSignUpButton } from '../styled/auth';

export const UsernameForm = ({ state, updateState, setError }) => {
  const handleClick = event => {
    const noCharpAndAt2Symbols = '[^@#]{2,}$';
    if (!state.username.match(noCharpAndAt2Symbols)) {
      event.preventDefault();
      setError(
        'The username must be at least 2 characters long and not contain "#" and "@"'
      );
    }
  };

  return (
    <FormContent>
      <label htmlFor="username">Username</label>
      <AuthInput
        id="username"
        type="text"
        maxLength="32"
        required
        value={state.username}
        onChange={e => updateState({ username: e.target.value.trim() })}
      />
      <AuthSignUpButton onClick={handleClick}>
        Create an account
      </AuthSignUpButton>
    </FormContent>
  );
};

const FormContent = styled(AuthFormContent)`
  padding: 35px;
  border: 1px solid var(--border-light);
  justify-content: center;
  input {
    line-height: 25px;
  }
`;
