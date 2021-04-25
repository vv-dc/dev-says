import React from 'react';
import styled from 'styled-components';
import CellCode from './code';
import CellMarkDown from './markdown';

const Cell = ({ type, ...rest }) => {
  return (
    <Wrapper>
      {type === 'code' ? <CellCode {...rest} /> : <CellMarkDown {...rest} />}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Cell;
