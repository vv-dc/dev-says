import React from 'react';
import styled from 'styled-components';

import ViewReplies from '../shared/view-replies';

const Footer = ({ replies, showReplies }) => {
  return (
    <FooterWrapper>
      <Reply>Reply</Reply>
      <Report>Report</Report>
      <ViewReplies replies={replies} onClick={showReplies} />
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  color: var(--gray);
  font-size: 12px;
  & > *:not(:last-child) {
    margin-right: 5px;
  }
`;

const BaseLink = styled.a`
  cursor: pointer;
`;

const Reply = styled(BaseLink)``;
const Report = styled(BaseLink)``;
