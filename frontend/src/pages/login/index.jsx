import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, ErrorBlock } from '../../components/styled/auth';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInput = event => {
    event.preventDefault();
    setError('');
  };

  const isValidForm = () => {
    return login.length && password.length;
  };

  return (
    <LoginBody>
      {error ? <ErrorBlock>{error}</ErrorBlock> : null}
      <LoginForm onSubmit={handleInput}>
        <Input
          type="text"
          placeholder="Username or email address"
          onChange={e => setLogin(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button disabled={!isValidForm()}>Login</Button>
      </LoginForm>
    </LoginBody>
  );
};

export default LoginPage;

const LoginBody = styled.div``;
const LoginForm = styled.form``;
