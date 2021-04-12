import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthStore from '../../stores/auth-store';
import { AuthService } from '../../services/auth.service';

const IndexPage = () => {
  return (
    <Wrapper>
      <h1>{AuthStore.accessToken}</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <button onClick={async () => await AuthService.logout()}>Logout</button>
    </Wrapper>
  );
};

export default observer(IndexPage);

const Wrapper = styled.div`
  color: var(--light-gray);
`;
