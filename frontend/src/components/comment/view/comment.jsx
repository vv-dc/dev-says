import React from 'react';
import styled from 'styled-components';

import Header from './header';
import Footer from './footer';
import MarkDown from '../../cell/markdown';

const CommentBody = ({ data, showReplies }) => {
  const { author, postedAt, updatedAt, rawContent, replies } = data;
  return (
    <div>
      <Header author={author} postedAt={postedAt} updatedAt={updatedAt} />
      <Content>
        <MarkDown source={rawContent} />
      </Content>
      <Footer replies={replies} showReplies={showReplies} />
    </div>
  );
};

export default CommentBody;

const Content = styled.div`
  margin-top: 2px;
  margin-bottom: 7px;
  line-height: 20px;
`;
