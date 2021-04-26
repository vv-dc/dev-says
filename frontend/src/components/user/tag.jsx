import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UserTag = ({ username }) => (
  <UserLink to={`/${username}`}>@{username}</UserLink>
);

export default UserTag;

const UserLink = styled(Link)`
  &:hover {
    color: var(--green);
  }
`;
