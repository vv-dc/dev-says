import React from 'react';
import styled from 'styled-components';

import PostMenu from './menu';
import PostHeader from './header';
import PostBody from './body';
import PostTags from './tags';
import PostComments from './comments';
import { CommentStore } from '../../stores/comment-store';

const Post = ({ user, post }) => {
  const {
    id,
    title,
    content,
    createdAt,
    updatedAt,
    tags,
    commentsCount,
  } = post;
  const store = new CommentStore(id);
  return (
    <PostWrapper>
      <PostMenu postId={id} />
      <PostContent>
        <PostHeader user={user} createdAt={createdAt} updatedAt={updatedAt} />
        <PostBody title={title} content={content} />
        <PostTags tags={tags} />
        <PostComments store={store} commentsCount={commentsCount} />
      </PostContent>
    </PostWrapper>
  );
};

export default Post;

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  & > * {
    background-color: var(--bg-post);
    box-shadow: 0px 0px 4px #000;
  }
  & > :first-child {
    margin-right: 10px;
  }
`;

const PostContent = styled.div`
  width: 600px;
  padding: 30px;
`;
