'use strict';

const { BadRequest } = require('http-errors');
require('dotenv').config();
const { COOKIE_SECRET, REFRESH_EXPIRES_IN, DOMAIN } = process.env;

const schema = require('../schemas/auth');
const { AuthService } = require('./../services/auth/auth.service');

module.exports = async function (fastify) {
  fastify.register(require('fastify-cookie'), {
    secret: COOKIE_SECRET,
  });

  fastify.decorateRequest('getRefreshToken', function () {
    let { refreshToken } = this.cookies;
    refreshToken = this.unsignCookie(refreshToken);
    if (!refreshToken.valid) {
      throw new BadRequest('Invalid Cookie');
    }
    return refreshToken.value;
  });

  fastify.decorateReply('sendTokens', function ({ accessToken, refreshToken }) {
    const expiresIn = parseInt(REFRESH_EXPIRES_IN);
    this.setCookie('refreshToken', refreshToken, {
      // secure: true,
      // httpOnly: true,
      signed: true,
      sameSite: true,
      domain: DOMAIN,
      path: '/auth',
      maxAge: Math.floor(expiresIn * 0.001),
      expires: new Date(Date.now() + expiresIn),
    });
    this.send({ accessToken });
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
      const { email, password, username } = request.body;
      await authService.register(email, password, username);
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
      const userAgent = String(request.headers['user-agent']);
      const { login, password, fingerprint } = request.body;
      const tokenPair = await authService.login(
        login,
        password,
        fingerprint,
        userAgent
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
