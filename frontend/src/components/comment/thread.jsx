import React from 'react';

import CommentBranch from './branch';

const CommentThread = ({ comments, commentForm }) => (
  <ul>
    {comments.map(comment => (
      <CommentBranch key={comment.id} comment={comment} />
    ))}
    {commentForm}
  </ul>
);

export default CommentThread;
