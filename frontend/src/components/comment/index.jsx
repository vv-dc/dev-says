import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import DropDown from './dropdown';
import CommentContext from './context';

const CommentSection = observer(({ store, commentsCount, isExpanded }) => (
  <CommentContext.Provider value={{ store }}>
    <SectionWrapper>
      <DropDown
        replies={{ parentId: null, count: commentsCount }}
        isExpanded={isExpanded}
      />
    </SectionWrapper>
  </CommentContext.Provider>
));

export default CommentSection;

const SectionWrapper = styled.div`
  width: 540px;
  font-size: 14px;
  @media screen and (max-width: 600px) {
    width: calc(100vw - 60px);
  }
`;
