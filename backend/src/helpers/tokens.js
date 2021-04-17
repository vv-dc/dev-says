'use strict';

const { BadRequest } = require('http-errors');

require('dotenv').config();
const { REFRESH_EXPIRES_IN, DOMAIN, PROTOCOL } = process.env;

function getRefreshToken() {
  let { refreshToken } = this.cookies;
  refreshToken = this.unsignCookie(refreshToken);
  if (!refreshToken.valid) {
    throw new BadRequest('Invalid Cookie');
  }
  return refreshToken.value;
}

function sendTokens(accessToken, refreshToken) {
  const expiresIn = parseInt(REFRESH_EXPIRES_IN);
  this.setCookie('refreshToken', refreshToken, {
    secure: PROTOCOL === 'https',
    httpOnly: true,
    signed: true,
    sameSite: true,
    domain: DOMAIN,
    path: '/auth',
    maxAge: Math.floor(expiresIn * 0.001),
    expires: new Date(Date.now() + expiresIn),
  });
  this.send({ accessToken });
}

module.exports = {
  getRefreshToken,
  sendTokens,
};
