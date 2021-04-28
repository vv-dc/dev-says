import React, { useState } from 'react';
import styled from 'styled-components';

import CommentBody from './view/comment';
import DropDown from './dropdown';
import SideBlock from './side';

const CommentBranch = ({ comment }) => {
  const [isExpanded, setExpanded] = useState(false);
  const replies = (({ id, children, replies }) => ({
    id,
    children,
    count: replies,
  }))(comment);

  const onExpnadedChange = () => setExpanded(state => !state);
  return (
    <BranchWrapper>
      <SideBlock author={comment.author} />
      <MainBlock>
        <CommentBody data={comment} showReplies={onExpnadedChange} />
        <DropDown replies={replies} isExpanded={isExpanded} />
      </MainBlock>
    </BranchWrapper>
  );
};

export default CommentBranch;

const BranchWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const MainBlock = styled.div`
  width: 100%;
  margin-left: 10px;
`;
