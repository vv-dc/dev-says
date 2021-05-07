import React from 'react';
import styled from 'styled-components';

import FormattedNumber from '../../shared/formatted-number';
import { InternalLink } from '../../styled/link';

const UserNumericInfo = ({ username, posts, followers, following }) => (
  <NumericWrapper>
    <span>
      <FormattedNumber number={posts} /> Posts
    </span>
    <InternalLink to={`${username}/followers`}>
      <FormattedNumber number={followers} /> Followers
    </InternalLink>
    <InternalLink to={`${username}/following`}>
      <FormattedNumber number={following} /> Following
    </InternalLink>
  </NumericWrapper>
);

export default UserNumericInfo;

const NumericWrapper = styled.div`
  & > :not(:last-child) {
    margin-right: 10px;
  }
`;
