import React from 'react';
import styled from 'styled-components';

import { ExternalLink } from '../styled/link';
import { FaBase } from '../styled/fa-base';

const FaLink = ({ link }) => (
  <Link href={link}>
    <span className="fas fa-link" />
    {link}
  </Link>
);

export default FaLink;

const Link = styled(ExternalLink)(FaBase);
