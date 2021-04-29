import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import CommentThread from './thread';
import CommentContext from './context';

const CommentDropDown = ({ replies, isExpanded }) => {
  const { fetchComments } = useContext(CommentContext);
  const { id, count, children } = replies;

  useEffect(() => {
    if (children.length !== +count && isExpanded) fetchComments(id);
  }, [isExpanded]);

  return (
    isExpanded && (
      <ThreadWrapper>
        <CommentThread comments={children} />
      </ThreadWrapper>
    )
  );
};

export default CommentDropDown;

const ThreadWrapper = styled.div`
  margin-top: 10px;
`;
