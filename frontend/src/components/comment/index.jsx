import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import CommentDropDown from './dropdown';
import CommentContext from './context';

const CommentSection = observer(({ store, replyCount, isExpanded }) => (
  <CommentContext.Provider value={{ store }}>
    <SectionWrapper>
      <CommentDropDown
        replyInfo={{
          count: replyCount,
          parentId: null,
          replies: store.tree,
        }}
        isExpanded={isExpanded}
      />
    </SectionWrapper>
  </CommentContext.Provider>
));

export default CommentSection;

const SectionWrapper = styled.div`
  font-size: 14px;
`;
