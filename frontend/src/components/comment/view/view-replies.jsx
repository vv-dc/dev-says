import React from 'react';
import styled from 'styled-components';

const ViewReplies = ({ replyCount, onClick }) =>
  replyCount > 0 && (
    <Replies onClick={onClick}>
      View {replyCount} {replyCount == 1 ? 'reply' : 'replies'}
    </Replies>
  );

export default ViewReplies;

const Replies = styled.a`
  color: var(--green);
  font-weight: 900;
  cursor: pointer;
`;
