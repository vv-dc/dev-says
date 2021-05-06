import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import SideBlock from '../side';
import CommentContext from '../context';
import { AuthService } from '../../../services/auth.service';
import { BaseButton } from '../../styled/base-button';

const CommentForm = ({ parentId, onCancel }) => {
  const { store } = useContext(CommentContext);
  const [comment, setComment] = useState('');

  const handleCancel = event => {
    event.preventDefault();
    onCancel();
  };
  const handleSubmit = event => {
    event.preventDefault();
    store.addComment(parentId, comment);
    onCancel();
  };

  return (
    <FormWrapper>
      <SideBlock author={AuthService.user} />
      <Form onSubmit={handleSubmit}>
        <CommentArea
          value={comment}
          placeholder="Leave a comment"
          onChange={event => setComment(event.target.value)}
        />
        <div>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <CommentButton>Comment</CommentButton>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default CommentForm;

const FormWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Form = styled.form`
  width: 100%;
  margin-left: 10px;
`;

const CommentArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  padding: 6px 8px;
  margin-bottom: 7px;
  color: var(--light-gray);
  background-color: transparent;
`;

const FormButton = styled(BaseButton)`
  padding: 6px 8px;
  border-radius: 12px;
  color: black;
`;

const CancelButton = styled(FormButton)`
  margin-right: 5px;
  background-color: var(--green);
`;
const CommentButton = styled(FormButton)`
  background-color: var(--blue);
`;
