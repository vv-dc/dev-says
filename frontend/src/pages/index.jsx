import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { AuthService } from '../services/auth.service';
import Search from '../components/shared/search';
import LogoutButton from '../components/shared/logout-button';

const IndexPage = observer(() => (
  <IndexWrapper>
    <IndexHeader>
      {AuthService.isAuthenticated() ? (
        <>
          <h1>Hi, {AuthService.getUser().username}</h1>
          <LogoutButton />
        </>
      ) : (
        <ul>
          <IndexHeaderItem>
            <Link to="/login">Sign in</Link>
          </IndexHeaderItem>
          <IndexHeaderItem>
            <Link to="/register">Sign up</Link>
          </IndexHeaderItem>
        </ul>
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
`;

const IndexBody = styled.div`
  padding: 20px;
  border: 1px solid var(--border-light);
  margin: 0 auto;
`;

const IndexHeader = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const IndexHeaderItem = styled.li`
  display: inline-block;
  list-style: none;
  border: 1px solid var(--border-light);
  margin-right: 3px;
  padding: 5px 15px;
  &:hover {
    background-color: var(--green);
    color: var(--black);
  }
`;
