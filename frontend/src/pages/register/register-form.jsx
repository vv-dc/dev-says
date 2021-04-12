import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthService } from '../../services/auth.service';
import { EmailForm } from './email-form';
import { UsernameForm } from './username-form';
import { AuthErrorBlock } from '../../components/styled/auth';

const RegisterForm = () => {
  const [state, setState] = useState({
    email: '',
    username: '',
    password: '',
    authCode: '',
    authProvider: 'local',
  });
  const [error, setError] = useState('');
  const [step, setStep] = useState(0);
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    AuthService.register(state)
      .then(() => history.push('/login'))
      .catch(err => {
        const message = err.response.data.message;
        setError(message);
        message === 'Email already picked' && updateStep(-1);
      });
  };

  const updateStep = shift => setStep(step => step + shift);

  const updateState = newState =>
    setState(prevState => ({ ...prevState, ...newState }));

  return (
    <FormWrapper>
      {error ? (
        <AuthErrorBlock onClick={() => setError('')}>{error}</AuthErrorBlock>
      ) : null}
      <form onSubmit={handleSubmit}>
        {step ? (
          <UsernameForm {...{ state, updateState, setError }} />
        ) : (
          <EmailForm {...{ state, updateState, updateStep, setError }} />
        )}
      </form>
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
  label:after {
    content: ' *';
    color: var(--red);
    font-weight: 700;
  }
  ${AuthErrorBlock} {
    margin-bottom: 25px;
  }
`;
