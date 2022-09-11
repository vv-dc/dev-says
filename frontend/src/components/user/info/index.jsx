import React from 'react';
import styled from 'styled-components';

import UserPrimaryInfo from './primary';
import UserNumericInfo from './numeric';
import UserFollowButton from '../follow-button';
import UserSecondaryInfo from './secondary';
import Dots from '../../shared/dots';

const UserInfo = ({ user, stats }) => {
  const {
    userId,
    imageURL,
    backgroundURL,
    fullName,
    username,
    bio,
    location,
    company,
    website,
    createdAt,
  } = user;
  return (
    <InfoWrapper>
      <Background backgroundURL={backgroundURL} />
      <Content>
        <UserClickableInfo>
          <Avatar src={imageURL || 'unknown.png'} $size={120} />
          <Dots />
        </UserClickableInfo>
        <UserPrimaryInfo fullName={fullName} username={username} status={bio} />
        <UserNumericInfo username={username} {...stats} />
        <UserFollowButton userId={userId} />
        <UserSecondaryInfo
          location={location}
          company={company}
          website={website}
          joinedAt={createdAt}
        />
      </Content>
    </InfoWrapper>
  );
};

export default UserInfo;

const InfoWrapper = styled.div`
  font-size: 14px;
  border-bottom: 5px solid var(--border-dark);
`;

const Background = styled.div`
  height: 150px;
  background-image: url(${p => p.backgroundURL});
  background-color: var(--border-dark);
`;

const UserClickableInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
`;

const Avatar = styled.img`
  position: absolute;
  top: ${p => 45 - p.$size}px;
  width: ${p => p.$size}px;
  height: ${p => p.$size}px;
  border-radius: 50%;
  background-color: var(--green);
  border: 3px solid var(--bg-post);
`;

const Content = styled.div`
  position: relative;
  padding: 20px 30px;
  background-color: var(--bg-post);
  & > div:not(:first-of-type) {
    margin-bottom: 10px;
  }
  button {
    margin-top: 5px;
    margin-bottom: 15px;
  }
`;
