import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import CommentThread from './thread';
import CommentContext from './context';

const CommentDropDown = observer(({ replyInfo, isExpanded, replyForm }) => {
  const { store } = useContext(CommentContext);
  const { count, parentId, replies } = replyInfo;

  useEffect(() => {
    if (replies.size !== +count && isExpanded) {
      store.fetchComments(parentId);
    }
  }, [isExpanded]);

  return (
    isExpanded && (
      <ThreadWrapper>
        <CommentThread comments={replies} replyForm={replyForm} />
      </ThreadWrapper>
    )
  );
});

export default CommentDropDown;

const ThreadWrapper = styled.div`
  margin-top: 10px;
`;
