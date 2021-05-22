import React, { useState } from 'react';
import styled from 'styled-components';

import { BaseButton } from '../styled/base-button';

const UserFollowButton = ({ userId, followed }) => {
  const [following, setFollowing] = useState(followed);

  const handleClick = event => {
    event.preventDefault();
    console.log(userId);
    setFollowing(state => !state);
  };

  return (
    <FollowButton onClick={handleClick}>
      Follow{following ? 'ing' : ''}
    </FollowButton>
  );
};

export default UserFollowButton;

const FollowButton = styled(BaseButton)`
  background-color: transparent;
  border: 1px solid var(--green);
  color: var(--green);
`;
