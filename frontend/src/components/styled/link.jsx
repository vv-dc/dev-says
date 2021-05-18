import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ExternalLink = styled.a`
  :hover {
    text-decoration: underline;
    color: var(--green);
  }
`;

export const InternalLink = styled(Link)`
  :hover {
    color: var(--green);
  }
`;
