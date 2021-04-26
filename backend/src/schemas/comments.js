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

const addComment = {
  body: {
    type: 'object',
    properties: {
      postId: { type: 'integer' },
      authorId: { type: 'integer' },
      parentCommentId: { type: 'integer', nullable: true },
      rawContent: { type: 'string' },
    },
    required: ['postId', 'authorId', 'parentCommentId', 'rawContent'],
  },
};

const updateComment = {
  body: {
    type: 'object',
    properties: {
      commentId: { type: 'integer' },
      rawContent: { type: 'string' },
    },
    required: ['commentId', 'rawContent'],
  },
};

const deleteComment = {
  params: {
    type: 'object',
    properties: {
      commentId: { type: 'integer' },
    },
    required: ['commentId'],
  },
};

module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment,
};
