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
    totalScore: { type: 'integer' },
    commentsCount: { type: 'integer' },
  },
  required: [
    'id',
    'title',
    'content',
    'createdAt',
    'updatedAt',
    'totalScore',
    'commentsCount',
  ],
};

const postScoreStructure = {
  type: 'object',
  properties: {
    score: { type: 'integer' },
  },
  required: ['score'],
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
      userId: { type: 'integer' },
      postId: { type: 'integer' },
    },
    required: ['userId', 'postId'],
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
