import React from 'react';
import styled from 'styled-components';

import FaJoined from '../../font-awesome/joined';
import FaLink from '../../font-awesome/link';

const UserSecondaryInfo = ({ location, company, website, joinedAt }) => (
  <SecondaryInfo>
    {location && (
      <SecondaryItem>
        <span className="fas fa-map-marker-alt" />
        {location}
      </SecondaryItem>
    )}
    {company && (
      <SecondaryItem>
        <span className="far fa-building" />
        {company}
      </SecondaryItem>
    )}
    {website && (
      <SecondaryItem>
        <FaLink link={website} />
      </SecondaryItem>
    )}
    <SecondaryItem>
      <FaJoined date={joinedAt} />
    </SecondaryItem>
  </SecondaryInfo>
);

export default UserSecondaryInfo;

const SecondaryInfo = styled.ul`
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const SecondaryItem = styled.li`
  display: block;
  & > span {
    margin-right: 5px;
  }
`;
