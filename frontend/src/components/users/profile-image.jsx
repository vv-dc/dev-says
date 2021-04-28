import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UserProfileImage = ({ user, size }) => {
  const { username, imageURL } = user;
  return (
    <Link to={`/${username}`}>
      <ProfileImage src={imageURL} $size={size} />
    </Link>
  );
};

export default UserProfileImage;

const ProfileImage = styled.img`
  height: ${p => p.$size}px;
  width: ${p => p.$size}px;
  border-radius: 50%;
`;
