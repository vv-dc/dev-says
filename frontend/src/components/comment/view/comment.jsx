import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { AuthService } from '../../../services/auth.service';
import CommentContext from '../context';
import CommentHeader from './header';
import CommentForm from '../edit/form';
import CellMarkDown from '../../cell/markdown';

const CommentBody = observer(({ comment, footer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { store } = useContext(CommentContext);
  const history = useHistory();

  const { id, author, postedAt, updatedAt, rawContent } = comment;

  const handleEditSubmit = content => {
    store.updateComment(id, content);
    setIsEditing(false);
  };
  const handleEditClick = () => {
    if (AuthService.isAuthenticated()) {
      if (author.id === AuthService.getUserId()) {
        setIsEditing(true);
      }
    } else history.push('./login');
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
          <Option onClick={handleEditClick}>Edit</Option>
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
  margin-top: 5px;
  margin-bottom: 7px;
`;

const CommentView = styled.div``;

const Option = styled.li`
  padding: 8px 24px;
  cursor: pointer;
`;
