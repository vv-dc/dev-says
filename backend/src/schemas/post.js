'use strict';

const postStructure = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    content: {
      type: 'object',
      properties: {
        cells: { type: 'array' },
      },
    },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    tags: { type: 'array', items: { type: 'string' } },
  },
  required: ['id', 'title', 'content', 'createdAt'],
};

const postOne = {
  response: {
    200: {
      type: 'object',
      properties: {
        post: postStructure,
      },
    },
  },
};

const postList = {
  response: {
    200: {
      type: 'object',
      properties: {
        posts: {
          type: 'array',
          items: postStructure,
        },
      },
    },
  },
};

module.exports = { postOne, postList };
