import React, { useEffect } from 'react';
import styled from 'styled-components';
import CommentThread from './thread';

const DropDown = ({ replies, isExpanded, fetchComments }) => {
  const { id, count, children } = replies;

  useEffect(() => {
    if (children.length !== +count && isExpanded) fetchComments(id);
  }, [isExpanded]);

  return (
    isExpanded && (
      <ThreadWrapper>
        <CommentThread comments={children} fetchComments={fetchComments} />
      </ThreadWrapper>
    )
  );
};

export default DropDown;

const ThreadWrapper = styled.div`
  padding-left: 46px;
`;
