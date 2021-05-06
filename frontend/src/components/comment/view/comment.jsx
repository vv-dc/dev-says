import React from 'react';
import styled from 'styled-components';

import CommentHeader from './header';
import CellMarkDown from '../../cell/markdown';

const CommentBody = ({ comment, commentFooter }) => {
  const { author, postedAt, updatedAt, rawContent } = comment;
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
      {commentFooter}
    </>
  );
};

export default CommentBody;

const Content = styled.div`
  margin-top: 2px;
  margin-bottom: 7px;
  line-height: 20px;
`;
