'use strict';

const urlParams = {
  type: 'object',
  properties: {
    postId: { type: 'integer' },
    parentId: { type: 'integer', nullable: true },
  },
  required: ['postId'],
};

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
      required: ['comments'],
    },
  },
  params: urlParams,
};

const addComment = {
  response: {
    200: {
      type: 'object',
      properties: {
        comment: {
          type: 'object',
          properties: {
            commentId: { type: 'integer' },
            postedAt: { type: 'string', format: 'date-time' },
          },
          required: ['commentId', 'postedAt'],
        },
      },
      required: ['comment'],
    },
  },
  body: {
    type: 'object',
    properties: {
      authorId: { type: 'integer' },
      rawContent: { type: 'string' },
    },
    required: ['authorId', 'rawContent'],
  },
  params: urlParams,
};

module.exports = {
  getComments,
  addComment,
};
