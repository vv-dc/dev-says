import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import CommentThread from './thread';
import CommentContext from './context';

const CommentDropDown = observer(({ replies, isExpanded, commentForm }) => {
  const { store } = useContext(CommentContext);
  const { parentId, count } = replies;

  const children = store.getReplies(parentId);
  useEffect(() => {
    if (children.length !== +count && isExpanded) {
      store.fetchComments(parentId);
    }
  }, [isExpanded]);

  return (
    isExpanded && (
      <ThreadWrapper>
        <CommentThread comments={children} commentForm={commentForm} />
      </ThreadWrapper>
    )
  );
});

export default CommentDropDown;

const ThreadWrapper = styled.div`
  margin-top: 10px;
`;
