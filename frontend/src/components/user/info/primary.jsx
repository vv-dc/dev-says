import React from 'react';
import styled from 'styled-components';

const UserPrimaryInfo = ({ fullName, username, status }) => (
  <PrimaryInfo>
    {fullName && <FullName>{fullName}</FullName>}
    <Username>@{username}</Username>
    {status && <Status>{status}</Status>}
  </PrimaryInfo>
);

export default UserPrimaryInfo;

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const FullName = styled.span`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 5px;
`;

const Username = styled.span`
  color: var(--gray);
`;

const Status = styled.span`
  margin-top: 10px;
`;
