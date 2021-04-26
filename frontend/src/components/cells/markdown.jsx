import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkDown = ({ source }) => (
  <ReactMarkdown>{source || source.join('\n')}</ReactMarkdown>
);

export default MarkDown;
