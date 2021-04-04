import styled from 'styled-components';

export const Input = styled.input`
  margin: 12px 0 20px 0;
  padding: 6px 12px;
  background-color: ${props => props.theme.colors.lightGray};
  border: 1px solid #ccc;
  line-height: 20px;
  outline: none;
`;

export const Button = styled.button`
  margin-top: 5px;
  padding: 7px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.lightGray};
  line-height: 20px;
  cursor: pointer;
`;

export const ErrorBlock = styled.div`
  width: 320px;
  padding: 15px 0;
  margin: 0 auto 30px auto;
  text-align: center;
  font-size: 13px;
  background-color: #b70113;
  border-radius: 6px;
`;
