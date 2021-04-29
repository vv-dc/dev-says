import React from 'react';

import CommentBranch from './branch';

const CommentThread = ({ comments }) => (
  <ul>
    {comments.map(comment => (
      <CommentBranch key={comment.id} comment={comment} />
    ))}
  </ul>
);

export default CommentThread;
