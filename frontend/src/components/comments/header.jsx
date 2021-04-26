import React from 'react';
import styled from 'styled-components';

import Dots from '../shared/dots';
import TimeAgo from '../shared/time-ago';
import Edited from '../shared/edited';
import UserTag from '../users/tag';

const Header = ({ author, postedAt, updatedAt }) => {
  return (
    <CommentHeader>
      <InfoBlock>
        <Username>
          <UserTag username={author.username} />
        </Username>
        <TimeAgo date={updatedAt} />
        <Edited createdAt={postedAt} updatedAt={updatedAt} />
      </InfoBlock>
      <Dots />
    </CommentHeader>
  );
};

export default Header;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoBlock = styled.h3`
  display: flex;
  line-height: 20px;
  font-weight: 400;
  & > * {
    margin-right: 5px;
  }
`;

const Username = styled.span`
  font-weight: 700;
`;
