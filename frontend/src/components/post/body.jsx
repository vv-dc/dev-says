import React from 'react';
import styled from 'styled-components';

import Cell from '../cell';

const PostBody = ({ title, content }) => (
  <BodyWrapper>
    <PostTitle>{title}</PostTitle>
    <ContentWrapper>
      {content.cells.map((cell, idx) => (
        <Cell key={idx} {...cell} />
      ))}
    </ContentWrapper>
  </BodyWrapper>
);

export default PostBody;

const BodyWrapper = styled.div`
  padding: 15px 0;
`;

const PostTitle = styled.h3`
  font-size: 20px;
  font-weight: 400;
`;

const ContentWrapper = styled.div`
  margin-top: 15px;
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;
