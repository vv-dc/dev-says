import React from 'react';
import styled from 'styled-components';

import PostHeader from './header';
import PostBody from './body';
import PostTags from './tags';

const Post = ({ user, post }) => {
  const { title, content, createdAt, updatedAt, tags } = post;
  return (
    <PostWrapper>
      <PostHeader user={user} createdAt={createdAt} updatedAt={updatedAt} />
      <PostBody title={title} content={content} />
      <PostTags tags={tags} />
    </PostWrapper>
  );
};

export default Post;

const PostWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--bg-post);
  box-shadow: 0px 0px 4px #000;
  @media screen and (max-width: 768px) {
    width: calc(100% - 60px);
  }
`;
