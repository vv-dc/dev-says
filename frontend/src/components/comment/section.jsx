import React, { useState } from 'react';
import styled from 'styled-components';

import { CommentService } from '../../services/comment.service';
import DropDown from './dropdown';
import CommentContext from './context';

const CommentSection = ({ postId, commentsCount, isExpanded }) => {
  const [commentTree, setCommentTree] = useState([]);
  const parentId = null;

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
    <CommentContext.Provider value={{ fetchComments }}>
      <SectionWrapper>
        <DropDown
          replies={{ id: parentId, count: commentsCount, children: comments }}
          isExpanded={isExpanded}
        />
      </SectionWrapper>
    </CommentContext.Provider>
  );
};

export default CommentSection;

const SectionWrapper = styled.div`
  width: 540px;
  font-size: 14px;
  @media screen and (max-width: 600px) {
    width: calc(100vw - 60px);
  }
`;
