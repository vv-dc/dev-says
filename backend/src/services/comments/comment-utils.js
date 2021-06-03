'use strict';

const formatComments = comments =>
  comments.map(comment => {
    const { authorId, username, imageURL, ...rest } = comment;
    rest.author = { id: authorId, username, imageURL };
    return rest;
  });

module.exports = { formatComments };
