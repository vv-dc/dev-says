import React from 'react';

const Edited = ({ createdAt, updatedAt }) =>
  createdAt !== updatedAt ? <span>(edited)</span> : null;

export default Edited;
