import styled from 'styled-components';

const BaseDivider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :after,
  :before {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    margin: 0 10px;
  }
`;

export const DarkDivider = styled(BaseDivider)`
  color: var(--black);
  :after,
  :before {
    background-color: var(--black);
  }
`;

export const LightDivider = styled(BaseDivider)`
  color: var(--light-gray);
  :after,
  :before {
    background-color: var(--light-gray);
  }
`;
