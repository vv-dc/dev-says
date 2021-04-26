import React from 'react';
import styled from 'styled-components';

const ViewReplies = ({ replies, onClick }) =>
  replies && (
    <Replies onClick={onClick}>
      View {replies} {replies == 1 ? 'reply' : 'replies'}
    </Replies>
  );

export default ViewReplies;

const Replies = styled.a`
  color: var(--green);
  font-weight: 700;
  cursor: pointer;
`;
