import React from 'react';
import styled from 'styled-components';

import { AuthService } from '../../services/auth.service';
import { BaseButton } from '../styled/base-button';

const LogoutButton = () => {
  const handleClick = async () => {
    await AuthService.logout();
  };
  return <ButtonWrapper onClick={handleClick}>Logout</ButtonWrapper>;
};

export default LogoutButton;

const ButtonWrapper = styled(BaseButton)`
  background-color: var(--red);
  color: var(--black);
  &:hover {
    opacity: 0.7;
  }
`;
