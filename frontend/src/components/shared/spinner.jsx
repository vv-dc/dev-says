import React from 'react';
import styled from 'styled-components';

const Spinner = ({ width, height }) => (
  <SpinnerWrapper $width={width} $height={height}>
    <SpinnerRing $size={Math.min(width, height) / 2} />
  </SpinnerWrapper>
);

export default Spinner;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${p => p.$width}px;
  height: ${p => p.$height}px;
  margin: 0 auto;
`;

const SpinnerRing = styled.div`
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  margin: 8px;
  border: 6px solid var(--green);
  border-color: var(--green) transparent var(--green) transparent;
  border-radius: 50%;
  animation: dual-rotation 1.2s linear infinite;
  @keyframes dual-rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
