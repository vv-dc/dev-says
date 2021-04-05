import styled from 'styled-components';

export const AuthErrorBlock = styled.div`
  padding: 20px 30px;
  background-color: var(--error-red);
  border: 1px solid #777;
  border-radius: 6px;
  color: #eee;
  text-align: center;
  font-size: 13px;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const AuthInput = styled.input`
  margin-top: 12px;
  margin-bottom: 20px;
  padding: 6px 12px;
  background-color: var(--light-gray);
  line-height: 20px;
  &:focus {
    outline: 2px solid var(--blue);
  }
`;

const AuthButton = styled.button`
  padding: 7px 16px;
  border: none;
  border-radius: 6px;
  color: var(--light-gray);
  cursor: pointer;
`;

export const AuthSignInButton = styled(AuthButton)`
  background-color: var(--green);
  line-height: 20px;
`;

export const AuthSignUpButton = styled(AuthButton)`
  background-color: var(--blue);
  line-height: 32px;
`;

export const AuthLink = styled.div`
  text-align: center;
  a {
    margin-left: 5px;
    color: var(--blue);
  }
`;
