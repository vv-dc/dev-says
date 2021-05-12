import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import CommentContext from '../context';
import CommentHeader from './header';
import CommentForm from '../edit/form';
import CellMarkDown from '../../cell/markdown';

const CommentBody = observer(({ comment, footer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { store } = useContext(CommentContext);

  const { id, author, postedAt, updatedAt, rawContent } = comment;

  const handleEditSubmit = content => {
    store.updateComment(id, content);
    setIsEditing(false);
  };
  return isEditing ? (
    <CommentForm
      handleSubmit={handleEditSubmit}
      handleCancel={() => setIsEditing(false)}
      initContent={rawContent}
    />
  ) : (
    <CommentView>
      <CommentHeader author={author} date={{ postedAt, updatedAt }}>
        <ul>
          <Option onClick={() => setIsEditing(true)}>Edit</Option>
        </ul>
      </CommentHeader>
      <Content>
        <CellMarkDown source={rawContent} />
      </Content>
      {footer}
    </CommentView>
  );
});

export default CommentBody;

const Content = styled.div`
  margin-top: 2px;
  margin-bottom: 7px;
  line-height: 20px;
`;

const CommentView = styled.div``;

const Option = styled.li`
  padding: 8px 24px;
  line-height: 20px;
  cursor: pointer;
`;
