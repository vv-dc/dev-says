'use strict';

const Cookie = require('fastify-cookie');
const schema = require('../schemas/auth');
require('dotenv').config();

const { getRefreshToken, sendTokens } = require('../helpers/tokens');
const { AuthService } = require('../services/auth/auth.service');

module.exports = async function (fastify, options) {
  fastify.register(Cookie, {
    secret: options.cookieSecret
      ? options.cookieSecret
      : process.env.COOKIE_SECRET,
  });

  fastify.decorateRequest('getRefreshToken', function () {
    return getRefreshToken.bind(this)();
  });
  fastify.decorateRequest('getUserAgent', function () {
    return this.headers['user-agent'];
  });
  fastify.decorateReply('sendTokens', function ({ accessToken, refreshToken }) {
    sendTokens.bind(this)(accessToken, refreshToken);
  });

  const authService = new AuthService();

  fastify.route({
    method: 'POST',
    path: '/auth/register',
    schema: schema.register,
    handler: async (request, reply) => {
      await authService.register(request.body, 'local');
      reply.code(200).send();
    },
  });

  fastify.route({
    method: 'POST',
    path: '/auth/register/github',
    schema: schema.registerExternal,
    handler: async (request, reply) => {
      await authService.registerGithub(request.body);
      reply.code(200).send();
    },
  });

  fastify.route({
    method: 'POST',
    path: '/auth/register/google',
    schema: schema.registerExternal,
    handler: async (request, reply) => {
      await authService.registerGoogle(request.body);
      reply.code(200).send();
    },
  });

  fastify.route({
    method: 'POST',
    path: '/auth/login',
    schema: schema.login,
    handler: async (request, reply) => {
      const tokenPair = await authService.login(
        request.body,
        request.getUserAgent(),
        'local'
      );
      reply.sendTokens(tokenPair);
    },
  });

  fastify.route({
    method: 'POST',
    path: '/auth/login/github',
    schema: schema.loginExternal,
    handler: async (request, reply) => {
      const tokenPair = await authService.loginGithub(
        request.body,
        request.getUserAgent()
      );
      reply.sendTokens(tokenPair);
    },
  });

  fastify.route({
    method: 'POST',
    path: '/auth/login/google',
    schema: schema.loginExternal,
    handler: async (request, reply) => {
      const tokenPair = await authService.loginGoogle(
        request.body,
        request.getUserAgent()
      );
      reply.sendTokens(tokenPair);
    },
  });

  fastify.route({
    method: 'POST',
    path: '/auth/refresh',
    schema: schema.refresh,
    handler: async (request, reply) => {
      const tokenPair = await authService.refreshToken(
        request.getRefreshToken(),
        request.body.fingerprint
      );
      reply.sendTokens(tokenPair);
    },
  });

  fastify.route({
    method: 'POST',
    path: '/auth/logout',
    schema: schema.logout,
    handler: async (request, reply) => {
      await authService.logout(request.getRefreshToken());
      reply.code(200).send();
    },
  });
};
