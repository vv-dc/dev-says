import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { PostService } from '../../services/posts.service';
import Post from '../post';

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    const { posts } = await PostService.getByUserId(user.userId);
    setPosts(state => state.concat(posts));
  };

  useEffect(() => {
    fetchPosts().then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <h1>Loading posts...</h1>
  ) : (
    <PostsWrapper>
      {posts.map(post => (
        <Post key={post.id} post={post} user={user}></Post>
      ))}
    </PostsWrapper>
  );
};

export default UserPosts;

const PostsWrapper = styled.div`
  & > :not(:last-of-type) {
    margin-bottom: 35px;
  }
`;
