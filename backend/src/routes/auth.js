'use strict';

const schema = require('../schemas/auth');
require('dotenv').config();

const { getRefreshToken, sendTokens } = require('../helpers/tokens');
const { getGithubEmail } = require('../helpers/github-email');
const { AuthService } = require('./../services/auth/auth.service');

module.exports = async function (fastify) {
  fastify.register(require('fastify-cookie'), {
    secret: process.env.COOKIE_SECRET,
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
    handler: register,
  });

  async function register(request, reply) {
    try {
      await authService.register(request.body, 'local');
      reply.code(200).send();
    } catch (error) {
      reply.send(error);
    }
  }

  fastify.route({
    method: 'POST',
    path: '/auth/register/github',
    schema: schema.registerGithub,
    handler: registerGithub,
  });

  async function registerGithub(request, reply) {
    try {
      const { authCode, username } = request.body;
      const email = await getGithubEmail(authCode);
      await authService.registerGithub(email, username);
      reply.code(200).send();
    } catch (error) {
      reply.send(error);
    }
  }

  fastify.route({
    method: 'POST',
    path: '/auth/login',
    schema: schema.login,
    handler: login,
  });

  async function login(request, reply) {
    try {
      const tokenPair = await authService.login(
        request.body,
        request.getUserAgent(),
        'local'
      );
      reply.sendTokens(tokenPair);
    } catch (error) {
      reply.send(error);
    }
  }

  fastify.route({
    method: 'POST',
    path: '/auth/login/github',
    schema: schema.loginGithub,
    handler: loginGithub,
  });

  async function loginGithub(request, reply) {
    try {
      const { authCode, fingerprint } = request.body;
      const email = await getGithubEmail(authCode);
      console.dir({ email });
      const tokenPair = await authService.loginGithub(
        email,
        fingerprint,
        request.getUserAgent()
      );
      reply.sendTokens(tokenPair);
    } catch (error) {
      reply.send(error);
    }
  }

  fastify.route({
    method: 'POST',
    path: '/auth/refresh',
    schema: schema.refresh,
    handler: refresh,
  });

  async function refresh(request, reply) {
    try {
      const { fingerprint } = request.body;
      const tokenPair = await authService.refreshToken(
        request.getRefreshToken(),
        fingerprint
      );
      reply.sendTokens(tokenPair);
    } catch (error) {
      reply.send(error);
    }
  }

  fastify.route({
    method: 'POST',
    path: '/auth/logout',
    schema: schema.logout,
    handler: logout,
  });

  async function logout(request, reply) {
    try {
      await authService.logout(request.getRefreshToken());
      reply.code(200).send();
    } catch (error) {
      reply.send(error);
    }
  }
};
