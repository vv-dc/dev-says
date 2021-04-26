import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CommentService } from '../../services/comment.service';
import CommentThread from './thread';

const CommentSection = ({ postId = 4 }) => {
  const [commentTree, setCommentTree] = useState([]);
  const parentId = null;

  useEffect(() => fetchComments(parentId), []);

  const fetchComments = async parentId => {
    const comments = await CommentService.getByParent(postId, parentId);
    const nodes = comments.map(comment =>
      Object.assign({}, comment, { children: [] })
    );
    setCommentTree(tree => {
      const parent = tree.filter(node => node.id === parentId)[0];
      if (parent) parent.children = nodes;
      return tree.concat(nodes);
    });
  };

  const comments = commentTree.filter(node => node.parentId === parentId);
  return (
    <ContentWrapper>
      <MainThreadWrapper>
        <CommentThread comments={comments} fetchComments={fetchComments} />
      </MainThreadWrapper>
    </ContentWrapper>
  );
};

export default CommentSection;

const ContentWrapper = styled.div`
  padding: 20px 30px;
  width: 600px;
  background-color: var(--bg-post);
  @media screen and (max-width: 600px) {
    width: 100vw;
  }
  margin: 0 auto;
`;

const MainThreadWrapper = styled.div`
  width: 540px;
  font-family: Cantarell;
  font-size: 14px;
  @media screen and (max-width: 600px) {
    width: calc(100vw - 60px);
  }
`;
