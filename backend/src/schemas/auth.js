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

const registerGithub = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      authCode: { type: 'string' },
    },
    required: ['username', 'authCode'],
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

const loginGithub = {
  response: login.response,
  body: {
    type: 'object',
    properties: {
      fingerprint: { type: 'string' },
      authCode: { type: 'string' },
    },
    required: ['fingerprint', 'authCode'],
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
  registerGithub,
  login,
  loginGithub,
  refresh,
  logout,
};
