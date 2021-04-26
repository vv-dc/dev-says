import React, { useState } from 'react';
import styled from 'styled-components';

import Comment from './comment';
import DropDown from './dropdown';

const CommentBranch = ({ comment, fetchComments }) => {
  const { id, children, replies: count } = comment;
  const [isExpanded, setExpanded] = useState(false);

  const onExpnadedChange = () => setExpanded(state => !state);
  return (
    <BranchWrapper>
      <Comment data={comment} showReplies={onExpnadedChange} />
      <DropDown
        replies={{ id, count, children }}
        isExpanded={isExpanded}
        fetchComments={fetchComments}
      />
    </BranchWrapper>
  );
};

export default CommentBranch;

const BranchWrapper = styled.div``;
