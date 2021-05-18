import React from 'react';
import styled from 'styled-components';

const DropDown = ({ isExpanded, text, onClick }) => (
  <DropDownWrapper onClick={onClick}>
    <span className={`fas fa-caret-${isExpanded ? 'up' : 'down'}`} />
    <span>&nbsp;{text}</span>
  </DropDownWrapper>
);

export default DropDown;

const DropDownWrapper = styled.a`
  cursor: pointer;
`;
