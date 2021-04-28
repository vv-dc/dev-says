import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { UserService } from '../services/users.service';
import UserNotFound from '../components/user/not-found';
import UserPosts from '../components/user/posts';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const { user } = await UserService.getByUsername(username);
    setUser(user);
  };

  useEffect(() => {
    fetchUser().then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : !user ? (
    <UserNotFound username={username} />
  ) : (
    <Wrapper>
      <h1>
        <span>{user.fullName}&nbsp;</span>
        <span>@{user.username}</span>
      </h1>
      <UserPosts user={user} />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  border-radius: 30px;
`;

export default UserPage;
