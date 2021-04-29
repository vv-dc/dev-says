import React from 'react';
import ReactMarkdown from 'react-markdown';

const CellMarkDown = ({ source }) => {
  return (
    <ReactMarkdown>
      {source instanceof Array ? source.join('\n') : source}
    </ReactMarkdown>
  );
};

export default CellMarkDown;
