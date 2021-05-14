import React from 'react';
import styled from 'styled-components';

import { AuthService } from '../../../services/auth.service';
import SideBlock from '../side';
import CommentForm from './form';

const ReplyForm = ({ handleSubmit, handleCancel }) => {
  return (
    <FormWrapper>
      <SideBlock author={AuthService.getUser()} />
      <CommentForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </FormWrapper>
  );
};

export default ReplyForm;

const FormWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  & > *:last-child {
    margin-left: 10px;
  }
`;
