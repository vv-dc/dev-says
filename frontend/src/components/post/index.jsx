import React from 'react';
import styled from 'styled-components';

import Cell from '../cell';

const Post = ({ user, post }) => {
  const { title, content, createdAt, updatedAt } = post;

  return (
    <PostWrapper>
      <p>{JSON.stringify(user)}</p>
      <p>{title}</p>
      {content.cells.map((cell, idx) => (
        <Cell key={idx} {...cell} />
      ))}
      <p>{createdAt}</p>
      <p>{updatedAt}</p>
    </PostWrapper>
  );
};

export default Post;

const PostWrapper = styled.div``;
