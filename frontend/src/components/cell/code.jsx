import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CellCode = ({ language, version, source }) => {
  return (
    <>
      <h1>Version: {version}</h1>
      <SyntaxHighlighter language={language} style={vs2015}>
        {source.join('\n')}
      </SyntaxHighlighter>
    </>
  );
};

export default CellCode;
