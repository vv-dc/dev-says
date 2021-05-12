import styled from 'styled-components';
import { BaseButton } from './base-button';

export const AuthErrorBlock = styled.div`
  padding: 20px 30px;
  background-color: var(--error-red);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  text-align: center;
  font-size: 13px;
`;

export const AuthFormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthInput = styled.input`
  margin: 11px 0 20px 0;
  padding: 5px 12px;
  background-color: var(--white);
  line-height: 20px;
  &:focus {
    outline: 2px solid var(--blue);
  }
`;

export const AuthSignInButton = styled(BaseButton)`
  background-color: var(--green);
  line-height: 20px;
  color: var(--white);
`;

export const AuthSignUpButton = styled(BaseButton)`
  background-color: var(--blue);
  line-height: 32px;
  color: var(--white);
`;

export const AuthLink = styled.div`
  text-align: center;
  a {
    margin-left: 5px;
    color: var(--blue);
  }
`;
