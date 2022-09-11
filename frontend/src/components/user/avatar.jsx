import React from 'react';
import styled from 'styled-components';

const UserAvatar = ({ user, size }) => {
  const { imageURL } = user;
  return <AvatarImg src={imageURL || 'unknown.png'} $size={size} />;
};

export default UserAvatar;

const AvatarImg = styled.img`
  height: ${p => p.$size}px;
  width: ${p => p.$size}px;
  border-radius: 50%;
`;
