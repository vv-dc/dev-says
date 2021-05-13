import React from 'react';
import styled from 'styled-components';

import Dots from '../../shared/dots';
import TimeAgo from '../../shared/time-ago';
import Edited from '../../shared/edited';
import UserTag from '../../user/tag';

const CommentHeader = ({ author, date, children }) => {
  const { postedAt, updatedAt } = date;
  return (
    <HeaderWrapper>
      <InfoBlock>
        <Username>
          <UserTag username={author.username} />
        </Username>
        <TimeAgo date={updatedAt} />
        <Edited createdAt={postedAt} updatedAt={updatedAt} />
      </InfoBlock>
      <Dots>{children}</Dots>
    </HeaderWrapper>
  );
};

export default CommentHeader;

const HeaderWrapper = styled.div`
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
