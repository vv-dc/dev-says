import React from 'react';
import styled from 'styled-components';

import Avatar from '../user/avatar';

const SideBlock = ({ author }) => (
  <SideWrapper>
    <Avatar user={author} size={36} />
  </SideWrapper>
);

export default SideBlock;

const SideWrapper = styled.div`
  align-self: flex-start;
`;
