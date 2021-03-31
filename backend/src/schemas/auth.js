'use strict';

const accessToken = {
  response: {
    200: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      login: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 1 },
    },
    required: ['login', 'password'],
  },
};

const refreshToken = {
  response: accessToken.response,
  body: {
    type: 'string',
    properties: {
      refreshToken: { type: 'string', minLength: 1 },
    },
    required: ['refreshToken'],
  },
};

module.exports = {
  accessToken,
  refreshToken,
};
