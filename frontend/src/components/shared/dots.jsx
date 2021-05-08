import React from 'react';
import styled from 'styled-components';

const Dots = () => (
  <DotsWrapper>
    <DotsList>
      <Dot />
      <Dot />
      <Dot />
    </DotsList>
  </DotsWrapper>
);

export default Dots;

const Dot = styled.div`
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background-color: var(--green);
  &:not(:last-of-type) {
    margin-right: 3px;
  }
`;

const DotsWrapper = styled.div`
  margin-left: auto;
`;

const DotsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-left: 15px;
  cursor: pointer;
  &:hover {
    background-color: rgba(13, 171, 118, 0.1);
  }
`;
