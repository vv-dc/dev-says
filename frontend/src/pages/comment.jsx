import React from 'react';
import styled from 'styled-components';

import CommentSection from '../components/comment/section';

const CommentPage = ({ postId = 4, commentsCount = 1 }) => {
  return (
    <ContentWrapper>
      <CommentSection
        postId={postId}
        commentsCount={commentsCount}
        isExpanded={true}
      />
    </ContentWrapper>
  );
};

export default CommentPage;

const ContentWrapper = styled.div`
  padding: 20px 30px;
  margin: 0 auto;
  width: 600px;
  background-color: var(--bg-post);
  @media screen and (max-width: 600px) {
    width: 100vw;
  }
`;
