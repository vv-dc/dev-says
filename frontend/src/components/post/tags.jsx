import React from 'react';
import styled from 'styled-components';

import Tag from '../tag';

const PostTags = ({ tags }) => (
  <TagsWrapper>
    {tags.map((tag, idx) => (
      <Tag key={idx} tagName={tag} />
    ))}
  </TagsWrapper>
);

export default PostTags;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -5px -5px 0 0;
  & > * {
    margin: 5px 5px 0 0;
  }
`;
