'use strict';

const formatComments = comments =>
  comments.map(comment => {
    const { username, imageURL, ...rest } = comment;
    rest.author = { username, imageURL };
    return rest;
  });

module.exports = { formatComments };
