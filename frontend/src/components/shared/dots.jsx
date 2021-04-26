import React from 'react';
import styled from 'styled-components';

const Dots = () => (
  <DotList>
    <Dot />
    <Dot />
    <Dot />
  </DotList>
);

export default Dots;

const Dot = styled.div`
  background-color: var(--green);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

const DotList = styled.div`
  display: flex;
`;
