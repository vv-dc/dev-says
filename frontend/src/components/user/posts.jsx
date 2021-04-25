import React, { useState, useEffect } from 'react';
import { PostService } from '../../services/posts.service';
import Post from '../post';

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    const posts = await PostService.getByUserId(user.userId);
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts().then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <h1>Loading posts...</h1>
  ) : (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} user={user}></Post>
      ))}
    </div>
  );
};

export default UserPosts;
