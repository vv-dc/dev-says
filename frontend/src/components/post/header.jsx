import React from 'react';
import styled from 'styled-components';

import UserAvatar from '../user/avatar';
import UserTag from '../user/tag';
import TimeAgo from '../shared/time-ago';
import Edited from '../shared/edited';
import Dots from '../shared/dots';

const PostHeader = ({ user, createdAt, updatedAt }) => {
  const { fullName, username, company } = user;
  return (
    <HeaderWrapper>
      <UserAvatar user={user} size={60} />
      <HeaderBody>
        <FirstLine>
          {fullName && <UserFullName>{fullName}</UserFullName>}
          <UserTag username={username} />
          <span>·</span>
          <TimeAgo date={updatedAt} />
          <Edited createdAt={createdAt} updatedAt={updatedAt} />
        </FirstLine>
        <SecondLine>
          <span className="far fa-building" /> {company}
        </SecondLine>
      </HeaderBody>
      <Dots />
    </HeaderWrapper>
  );
};

export default PostHeader;

const HeaderWrapper = styled.div`
  display: flex;
  & > :last-child {
    margin-left: auto;
  }
`;

const HeaderBody = styled.div`
  padding-top: 5px;
  margin-left: 15px;
`;

const FirstLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin-top: -3px;
  margin-right: 15px;
  * {
    margin: 3px 5px 0 0;
  }
`;

const UserFullName = styled.span`
  font-weight: bold;
`;

const SecondLine = styled.div`
  margin-top: 8px;
  font-size: 14px;
`;
