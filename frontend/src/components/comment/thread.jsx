import React from 'react';

import CommentBranch from './comment-branch';

const CommentThread = ({ comments }) => {
  return (
    <ul>
      {comments.map(comment => (
        <CommentBranch key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentThread;
