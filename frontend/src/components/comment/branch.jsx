import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AuthService } from '../../services/auth.service';
import CommentBody from './view/comment';
import CommentDropDown from './dropdown';
import SideBlock from './side';
import CommentForm from './edit/form';
import CommentFooter from './view/footer';

const CommentBranch = ({ comment }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [withReply, setWithReply] = useState(false);
  const history = useHistory();

  const { id: parentId, replies: count, author } = comment;

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
          commentFooter={
            <CommentFooter
              replies={count}
              showReplies={() => setExpanded(state => !state)}
              addReply={addReply}
            />
          }
        />
        <CommentDropDown
          isExpanded={isExpanded}
          commentForm={
            withReply && (
              <CommentForm
                parentId={parentId}
                onCancel={() => setWithReply(false)}
              />
            )
          }
          replies={{ parentId, count }}
        />
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
