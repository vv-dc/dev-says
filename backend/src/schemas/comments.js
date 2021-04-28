'use strict';

const getComments = {
  response: {
    200: {
      type: 'object',
      properties: {
        comments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              parentId: { type: 'integer', nullable: true },
              author: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  imageURL: { type: 'string' },
                },
                required: ['username', 'imageURL'],
              },
              rawContent: { type: 'string' },
              postedAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
              replies: { type: 'integer', nullable: true },
            },
            required: [
              'id',
              'parentId',
              'author',
              'rawContent',
              'postedAt',
              'updatedAt',
              'replies',
            ],
          },
        },
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      postId: { type: 'integer' },
      parentId: { type: 'integer', nullable: true },
    },
    required: ['postId'],
  },
};

module.exports = {
  getComments,
};
