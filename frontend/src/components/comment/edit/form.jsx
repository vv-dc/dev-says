import React, { useState } from 'react';
import styled from 'styled-components';

import { BaseButton } from '../../styled/base-button';

const CommentForm = ({ handleSubmit, handleCancel, initContent = '' }) => {
  const [content, setContent] = useState(initContent);

  const handleFormSubmit = event => {
    event.preventDefault();
    handleSubmit(content);
  };
  const handleFormCancel = event => {
    event.preventDefault();
    handleCancel();
  };
  return (
    <Form onSubmit={handleFormSubmit}>
      <CommentArea
        value={content}
        onChange={event => setContent(event.target.value)}
        placeholder="Leave a comment"
      />
      <div>
        <CancelButton onClick={handleFormCancel}>Cancel</CancelButton>
        <CommentButton>Comment</CommentButton>
      </div>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  width: 100%;
`;

const CommentArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  padding: 4px 4px;
  margin-bottom: 7px;
  color: var(--light-gray);
  background-color: transparent;
`;

const FormButton = styled(BaseButton)`
  padding: 6px 8px;
  border-radius: 12px;
  color: #000;
`;

const CancelButton = styled(FormButton)`
  margin-right: 5px;
  background-color: var(--green);
`;
const CommentButton = styled(FormButton)`
  background-color: var(--blue);
`;
