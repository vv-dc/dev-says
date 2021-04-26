import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Tag = ({ tagName }) => <TagLink to={`/t/${tagName}`}>{tagName}</TagLink>;

export default Tag;

const TagLink = styled(Link)`
  padding: 5px 8px;
  border-radius: 30px;
  background-color: var(--green);
  font-size: 12px;
  color: var(--black);
  &:hover {
    opacity: 0.7;
  }
`;
