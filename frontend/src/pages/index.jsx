import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { AuthService } from '../services/auth.service';
import Search from '../components/shared/search';
import LogoutButton from '../components/shared/logout-button';

const IndexPage = observer(() => (
  <IndexWrapper>
    <IndexHeader>
      {AuthService.isAuthenticated() ? (
        <>
          <IndexHeaderItem>
            <h1>Hi, {AuthService.getUser().username}</h1>
          </IndexHeaderItem>
          <LogoutButton />
        </>
      ) : (
        <>
          <IndexHeaderItem>
            <Link to="/login">Sign in</Link>
          </IndexHeaderItem>
          <IndexHeaderItem>
            <Link to="/register">Sign up</Link>
          </IndexHeaderItem>
        </>
      )}
    </IndexHeader>
    <IndexBody>
      <Search />
    </IndexBody>
  </IndexWrapper>
));

export default IndexPage;

const IndexWrapper = styled.div`
  padding: 35px 60px;
  button {
    margin-left: auto;
  }
`;

const IndexBody = styled.div`
  padding: 20px;
  border: 1px solid var(--border-light);
  margin: 0 auto;
`;

const IndexHeader = styled.ul`
  display: flex;
`;

const IndexHeaderItem = styled.li`
  list-style: none;
  border: 1px solid var(--border-light);
  border-bottom: 0;
  padding: 5px 15px;
  &:hover {
    background-color: var(--green);
    color: var(--black);
  }
  &:not(:last-of-type) {
    border-right: 0;
  }
`;
