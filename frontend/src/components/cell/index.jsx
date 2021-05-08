import React from 'react';
import styled from 'styled-components';
import CellCode from './code';
import CellMarkDown from './markdown';

const Cell = ({ type, ...rest }) => (
  <CellWrapper>
    {type === 'code' ? <CellCode {...rest} /> : <CellMarkDown {...rest} />}
  </CellWrapper>
);

const CellWrapper = styled.div`
  padding: 10px;
  border: 1px solid var(--border-light);
  font-size: 14px;
  overflow-x: auto;
  h1 {
    font-size: 18px;
  }
  h2 {
    font-size: 16px;
  }
  &:hover {
    border-color: var(--green);
  }
`;

export default Cell;
