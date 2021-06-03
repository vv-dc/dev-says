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
      <UserAvatar user={user} size={50} />
      <HeaderBody>
        <HeaderInfo>
          <GeneralInfo>
            {fullName && <UserFullName>{fullName}</UserFullName>}
            <UserTag username={username} />
            <span>·</span>
            <TimeAgo date={updatedAt} />
            <Edited createdAt={createdAt} updatedAt={updatedAt} />
          </GeneralInfo>
          <CompanyInfo>
            <span className="far fa-building" />
            &nbsp;{company}
          </CompanyInfo>
        </HeaderInfo>
        <Dots />
      </HeaderBody>
    </HeaderWrapper>
  );
};

export default PostHeader;

const HeaderWrapper = styled.div`
  display: flex;
  img {
    margin-right: 15px;
  }
`;

const HeaderBody = styled.div`
  display: inline-flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const HeaderInfo = styled.div``;

const GeneralInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 15px;
  margin: -3px -7px 0 0;
  & > * {
    margin: 3px 7px 0 0;
  }
`;

const UserFullName = styled.span`
  font-weight: bold;
`;

const CompanyInfo = styled.div`
  margin-top: 8px;
  font-size: 14px;
`;
