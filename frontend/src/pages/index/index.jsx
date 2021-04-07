import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthStore from '../../stores/auth-store';

const IndexPage = () => {
  return (
    <Wrapper>
      <h1>{AuthStore.accessToken}</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </Wrapper>
  );
};

export default IndexPage;

const Wrapper = styled.div`
  color: var(--light-gray);
`;
