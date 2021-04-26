import React from 'react';
import styled from 'styled-components';

import CommentBranch from './comment-branch';

const CommentThread = ({ comments, fetchComments }) => {
  return (
    <CommentList>
      {comments.map(comment => (
        <CommentBranch
          key={comment.id}
          comment={comment}
          fetchComments={fetchComments}
        />
      ))}
    </CommentList>
  );
};

export default CommentThread;

const CommentList = styled.ul`
  list-style: none;
`;
