import React from 'react';
import styled from 'styled-components';

import FormattedNumber from '../../shared/formatted-number';
import { InternalLink } from '../../styled/link';

const UserNumericInfo = ({
  username,
  postsNumber,
  followersNumber,
  followingNumber,
}) => (
  <NumericWrapper>
    <span>
      <FormattedNumber number={postsNumber} /> Posts
    </span>
    <InternalLink to={`${username}/followers`}>
      <FormattedNumber number={followersNumber} /> Followers
    </InternalLink>
    <InternalLink to={`${username}/following`}>
      <FormattedNumber number={followingNumber} /> Following
    </InternalLink>
  </NumericWrapper>
);

export default UserNumericInfo;

const NumericWrapper = styled.div`
  & > :not(:last-child) {
    margin-right: 10px;
  }
`;
