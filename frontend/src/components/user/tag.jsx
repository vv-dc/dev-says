import React from 'react';
import { InternalLink } from '../styled/link';

const UserTag = ({ username }) => (
  <InternalLink to={`/${username}`}>@{username}</InternalLink>
);

export default UserTag;
