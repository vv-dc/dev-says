import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';

const CellCode = ({ language, version, source }) => (
  <>
    <CodeControlPanel>
      <CodeInfoItem color="green">{language}</CodeInfoItem>
      <CodeInfoItem color="blue">{version}</CodeInfoItem>
    </CodeControlPanel>
    <CodeLines>
      <SyntaxHighlighter language={language} style={vs2015}>
        {source.join('\n')}
      </SyntaxHighlighter>
    </CodeLines>
  </>
);

export default CellCode;

const CodeInfoItem = styled.span`
  padding: 2px 5px;
  border-radius: 6px;
  background-color: ${p => `var(--${p.color})`};
`;

const CodeControlPanel = styled.div`
  margin-bottom: 10px;
  color: var(--black);
  ${CodeInfoItem}:not(:last-of-type) {
    margin-right: 5px;
  }
`;

const CodeLines = styled.div`
  font-family: 'Consolas';
`;
