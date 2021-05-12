'use strict';

const postParent = {
  type: 'object',
  properties: {
    postId: { type: 'integer' },
    parentId: { type: 'integer', nullable: true },
  },
  required: ['postId'],
};

const commentId = {
  type: 'object',
  properties: {
    commentId: { type: 'integer' },
  },
  required: ['commentId'],
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
              replyCount: { type: 'integer', nullable: true },
            },
            required: [
              'id',
              'parentId',
              'author',
              'rawContent',
              'postedAt',
              'updatedAt',
              'replyCount',
            ],
          },
        },
      },
      required: ['comments'],
    },
  },
  params: postParent,
};

const postComment = {
  response: { 200: commentId },
  body: {
    type: 'object',
    properties: {
      authorId: { type: 'integer' },
      rawContent: { type: 'string' },
      postedAt: { type: 'string', format: 'date-time' },
    },
    required: ['authorId', 'rawContent', 'postedAt'],
  },
  params: postParent,
};

const patchComment = {
  response: { 200: {} },
  body: {
    type: 'object',
    properties: {
      rawContent: { type: 'string' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['rawContent', 'updatedAt'],
  },
  params: commentId,
};

module.exports = {
  getComments,
  postComment,
  patchComment,
};
