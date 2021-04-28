import React from 'react';
import ReactMarkdown from 'react-markdown';

const CellMarkDown = ({ source }) => (
  <ReactMarkdown>{source.join('\n')}</ReactMarkdown>
);

export default CellMarkDown;
