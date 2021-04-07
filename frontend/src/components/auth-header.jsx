import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AuthHeader = ({ body }) => (
  <HeaderBody>
    <h1>
      <Link to="/">DevSays</Link>
    </h1>
    <h2>{body}</h2>
  </HeaderBody>
);

export default AuthHeader;

const HeaderBody = styled.header`
  text-align: center;
  color: var(--light-gray);
  padding: 25px 0 35px 0;
  h1 {
    font-family: var(--font-heading);
    font-size: 48px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 32px;
    font-weight: 100;
  }
`;
