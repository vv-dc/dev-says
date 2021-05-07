import React from 'react';
import styled from 'styled-components';

const Dots = () => (
  <DotsWrapper>
    <Dot />
    <Dot />
    <Dot />
  </DotsWrapper>
);

export default Dots;

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
  justify-content: flex-end;
  &:hover {
    opacity: 0.7;
  }
`;
