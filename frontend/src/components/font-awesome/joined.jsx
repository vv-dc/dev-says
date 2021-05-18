import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { FaBase } from '../styled/fa-base';

const FaJoined = ({ date }) => (
  <JoinedWrapper>
    <span className="far fa-calendar-alt" />
    Joined {moment(date).format('MMMM YYYY')}
  </JoinedWrapper>
);

export default FaJoined;

const JoinedWrapper = styled.span(FaBase);
