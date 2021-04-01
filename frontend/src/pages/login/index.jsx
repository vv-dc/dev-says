import React, { useState } from 'react';
import { LoginBody, LoginForm } from './styles';
import { Input, Button, ErrorBlock } from '../../components/styled/auth';
import { useTokenStorage } from '../../providers/tokenProvider';
import { loginUser } from '../../services/auth.service';

const LoginPage = () => {
  const tokenStorage = useTokenStorage();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInput = async event => {
    event.preventDefault();
    try {
      const { accessToken } = await loginUser(login, password);
      tokenStorage.setAccessToken(accessToken);
    } catch (e) {
      setError('Something went wrong');
    }
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
          value={login}
          placeholder="Username or email address"
          onChange={e => setLogin(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button disabled={!isValidForm()}>Login</Button>
      </LoginForm>
    </LoginBody>
  );
};

export default LoginPage;
