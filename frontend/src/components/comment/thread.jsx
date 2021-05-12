import React from 'react';
import { observer } from 'mobx-react';

import CommentBranch from './branch';

const CommentThread = observer(({ comments, replyForm }) => (
  <ul>
    {Array.from(comments).map(([id, comment]) => (
      <CommentBranch key={id} comment={comment} />
    ))}
    {replyForm}
  </ul>
));

export default CommentThread;
