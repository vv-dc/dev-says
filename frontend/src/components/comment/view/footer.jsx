import React from 'react';
import styled from 'styled-components';

import ViewReplies from './view-replies';

const CommentFooter = ({ replyCount, showReplies, addReply }) => (
  <FooterWrapper>
    <Reply onClick={addReply}>Reply</Reply>
    <Report>Report</Report>
    <ViewReplies replyCount={replyCount} onClick={showReplies} />
  </FooterWrapper>
);

export default CommentFooter;

const FooterWrapper = styled.div`
  display: flex;
  color: var(--gray);
  font-size: 12px;
  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;

const BaseLink = styled.a`
  cursor: pointer;
`;

const Reply = styled(BaseLink)``;
const Report = styled(BaseLink)``;
