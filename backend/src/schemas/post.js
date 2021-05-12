'use strict';

const postStructure = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
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
    commentsCount: { type: 'integer' },
  },
  required: [
    'id',
    'title',
    'content',
    'createdAt',
    'updatedAt',
    'commentsCount',
  ],
};

const postScoreStructure = {
  type: 'object',
  properties: {
    score: { type: 'integer' },
    totalScore: { type: 'integer' },
  },
};

const getPostOne = {
  params: {
    type: 'object',
    properties: {
      postId: { type: 'integer' },
    },
    required: ['postId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        post: postStructure,
      },
    },
  },
};

const getPostList = {
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

const getPostScore = {
  params: {
    type: 'object',
    properties: {
      userId: { type: 'integer', nullable: true },
      postId: { type: 'integer' },
    },
    required: ['postId'],
  },
  response: {
    200: postScoreStructure,
  },
};

const putPostScore = {
  params: getPostScore.params,
  body: postScoreStructure,
};

module.exports = { getPostOne, getPostList, getPostScore, putPostScore };
