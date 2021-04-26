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

const registerExternal = {
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
      required: ['accessToken'],
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

const loginExternal = {
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

const logout = {};

module.exports = {
  register,
  registerExternal,
  login,
  loginExternal,
  refresh,
  logout,
};
