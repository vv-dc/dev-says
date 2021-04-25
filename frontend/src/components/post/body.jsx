import React from 'react';
import Cell from '../cell';

const PostBody = ({ title, content }) => {
  return (
    <>
      <h1>{title}</h1>
      {content.cells.map((cell, idx) => (
        <Cell key={idx} {...cell} />
      ))}
    </>
  );
};

export default PostBody;
