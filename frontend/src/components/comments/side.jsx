import React from 'react';
import styled from 'styled-components';

import UserProfileImage from '../users/profile-image';

const SideBlock = ({ author }) => {
  return (
    <SideWrapper>
      <UserProfileImage user={author} size={36} />
    </SideWrapper>
  );
};

export default SideBlock;

const SideWrapper = styled.div`
  padding-top: 10px;
  align-self: flex-start;
`;
