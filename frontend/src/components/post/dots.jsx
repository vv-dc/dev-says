import React from 'react';
import styled from 'styled-components';

const PostDots = () => (
  <DotsWrapper>
    <Dot />
    <Dot />
    <Dot />
  </DotsWrapper>
);

export default PostDots;

const Dot = styled.div`
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: var(--green);
  &:not(:last-of-type) {
    margin-right: 5px;
  }
`;

const DotsWrapper = styled.nav`
  display: flex;
  padding: 5px 0;
  &:hover {
    opacity: 0.7;
  }
`;
