'use strict';

const register = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['username', 'email', 'password'],
  },
};

const login = {
  response: {
    200: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      fingerprint: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['fingerprint', 'login', 'password'],
  },
};

const refresh = {
  response: login.response,
  body: {
    type: 'object',
    properties: {
      fingerprint: { type: 'string' },
    },
    required: ['fingerprint'],
  },
};

const logout = {
  body: refresh.body,
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
