import React from 'react';
import styled from 'styled-components';

import CommentHeader from './header';
import CommentFooter from './footer';
import CellMarkDown from '../../cell/markdown';

const CommentBody = ({ data, showReplies }) => {
  const { author, postedAt, updatedAt, rawContent, replies } = data;
  return (
    <>
      <CommentHeader
        author={author}
        postedAt={postedAt}
        updatedAt={updatedAt}
      />
      <Content>
        <CellMarkDown source={rawContent} />
      </Content>
      <CommentFooter replies={replies} showReplies={showReplies} />
    </>
  );
};

export default CommentBody;

const Content = styled.div`
  margin-top: 2px;
  margin-bottom: 7px;
  line-height: 20px;
`;
