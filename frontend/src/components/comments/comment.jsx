import React from 'react';
import styled from 'styled-components';

import Header from './header';
import Footer from './footer';
import SideBlock from './side';
import MarkDown from '../cells/markdown';

const CommentBody = ({ data, showReplies }) => {
  const { author, postedAt, updatedAt, rawContent, replies } = data;
  return (
    <Comment>
      <SideBlock author={author} />
      <MainBlock>
        <Header author={author} postedAt={postedAt} updatedAt={updatedAt} />
        <Content>
          <MarkDown source={rawContent} />
        </Content>
        <Footer replies={replies} showReplies={showReplies} />
      </MainBlock>
    </Comment>
  );
};

export default CommentBody;

const Comment = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-top: 2px;
  margin-bottom: 7px;
  line-height: 20px;
`;

const MainBlock = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
`;
