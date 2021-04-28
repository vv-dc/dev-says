import React from 'react';

const Edited = ({ createdAt, updatedAt }) => {
  return createdAt !== updatedAt ? <span>(edited)</span> : null;
};

export default Edited;
