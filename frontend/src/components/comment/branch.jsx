import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { AuthService } from '../../services/auth.service';
import CommentContext from './context';
import CommentBody from './view/comment';
import CommentDropDown from './dropdown';
import SideBlock from './side';
import ReplyForm from './edit/reply-form';
import CommentFooter from './view/footer';

const CommentBranch = observer(({ comment }) => {
  const { store } = useContext(CommentContext);
  const history = useHistory();

  const [isExpanded, setExpanded] = useState(false);
  const [withReply, setWithReply] = useState(false);

  const { id, author, replyCount, replies } = comment;
  const replyInfo = {
    parentId: id,
    count: replyCount,
    replies,
  };

  const handleReplySubmit = content => {
    store.addComment(id, content);
    setWithReply(false);
  };

  const handleReplyCancel = () => {
    if (replyCount < 1) setExpanded(false);
    setWithReply(false);
  };

  const addReply = () => {
    if (!AuthService.isAuthenticated()) {
      history.push('./login');
    } else {
      setExpanded(true);
      setWithReply(true);
    }
  };

  return (
    <BranchWrapper>
      <SideBlock author={author} />
      <MainBlock>
        <CommentBody
          comment={comment}
          footer={
            <CommentFooter
              replyCount={replyCount}
              showReplies={() => setExpanded(state => !state)}
              addReply={addReply}
            />
          }
        />
        <CommentDropDown
          replyInfo={replyInfo}
          replyForm={
            withReply && (
              <ReplyForm
                handleSubmit={handleReplySubmit}
                handleCancel={handleReplyCancel}
              />
            )
          }
          isExpanded={isExpanded}
        />
      </MainBlock>
    </BranchWrapper>
  );
});

export default CommentBranch;

const BranchWrapper = styled.li`
  display: flex;
  margin-top: 10px;
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const MainBlock = styled.div`
  width: 100%;
  margin-left: 10px;
`;
