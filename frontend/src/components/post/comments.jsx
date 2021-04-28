import React from 'react';
import styled from 'styled-components';

const PostComments = ({ postId }) => {
  return <CommentsWrapper>{postId}</CommentsWrapper>;
};

export default PostComments;

const CommentsWrapper = styled.div``;
