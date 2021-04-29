import React from 'react';
import styled from 'styled-components';

const UserTag = ({ username }) => (
  <UserLink href={`/${username}`}>@{username}</UserLink>
);

export default UserTag;

const UserLink = styled.a`
  &:hover {
    color: var(--green);
  }
`;
