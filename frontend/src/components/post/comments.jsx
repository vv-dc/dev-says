import React, { useState } from 'react';
import styled from 'styled-components';

import Comment from '../comment';
import DropDown from '../shared/dropdown';

const PostComments = ({ store, commentsCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => setIsExpanded(state => !state);

  return commentsCount ? (
    <PostCommentsWrapper>
      <DropDown
        text={`View ${commentsCount} comments`}
        isExpanded={isExpanded}
        onClick={handleClick}
      />
      {isExpanded && (
        <Comment
          store={store}
          replyCount={commentsCount}
          isExpanded={isExpanded}
        />
      )}
    </PostCommentsWrapper>
  ) : null;
};

export default PostComments;

const PostCommentsWrapper = styled.div`
  font-size: 14px;
  margin-top: 15px;
`;
