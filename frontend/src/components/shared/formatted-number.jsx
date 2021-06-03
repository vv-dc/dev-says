import React from 'react';
import styled from 'styled-components';

import { formatNumber } from '../../helpers/format-number';

const FormattedNumber = ({ number }) => (
  <NumberWrapper>{formatNumber(number ?? 0)}</NumberWrapper>
);

export default FormattedNumber;

const NumberWrapper = styled.span`
  font-weight: 900;
`;
