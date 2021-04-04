import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { Input, Button, ErrorBlock } from '../../components/styled/auth';

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

  const isValidForm = () => {
    return email.length && username.length && password.length;
  };

  return (
    <FormWrapper>
      {error ? <ErrorBlock>{error}</ErrorBlock> : null}
      <Form onSubmit={handleInput}>
        <Input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="text"
          required
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button disabled={!isValidForm()}>Register</Button>
      </Form>
    </FormWrapper>
  );
};

export default RegisterForm;

const FormWrapper = styled.div``;
const Form = styled.form``;
