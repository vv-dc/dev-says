import React from 'react';
import ReactMarkdown from 'react-markdown';

const CellMarkDown = ({ source }) => (
  <ReactMarkdown>{source || source.join('\n')}</ReactMarkdown>
);

export default CellMarkDown;
