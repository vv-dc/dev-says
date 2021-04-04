import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import { Input, Button, ErrorBlock } from '../../components/styled/auth';

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
    <>
      {error ? <ErrorBlock>{error}</ErrorBlock> : null}
      <FormWrapper>
        <Form onSubmit={handleInput}>
          <label htmlFor="field-login">Username or email address</label>
          <Input
            id="field-login"
            type="text"
            required
            maxLength="255"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <label htmlFor="field-password">
            Password
            <Link to="/reset-password">Forgot password?</Link>
          </label>
          <Input
            id="field-password"
            type="password"
            required
            maxLength="30"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button>Sign in</Button>
        </Form>
      </FormWrapper>
    </>
  );
};

export default LoginForm;

const FormWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 30px;
  border: 0.5px solid #777;
  a {
    float: right;
    color: ${props => props.theme.colors.blue};
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
