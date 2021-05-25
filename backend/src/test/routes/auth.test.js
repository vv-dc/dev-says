'use strict';

const { build } = require('../helper');
const {
  registerSpy,
  loginSpy,
  refreshTokenSpy,
  logoutSpy,
} = require('../../services/auth/auth.service');

const { REFRESH_EXPIRES_IN, DOMAIN } = process.env;

jest.mock('../../services/auth/auth.service');

describe('auth routes', () => {
  const app = build({
    cookieSecret: {
      sign: value => value,
      unsign: value => ({
        value,
        valid: true,
      }),
    },
  });

  const tokenPair = {
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
  };
  const expectedCookie = {
    name: 'refreshToken',
    value: tokenPair.refreshToken,
    maxAge: Math.floor(+REFRESH_EXPIRES_IN * 0.001),
    domain: DOMAIN,
    path: '/auth',
    httpOnly: true,
    sameSite: 'Strict',
  };

  it('should register user using local auth', async () => {
    const registerData = {
      username: 'username',
      email: 'email',
      password: 'password',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: registerData,
    });
    expect(registerSpy).toBeCalledWith(registerData, 'local');
    expect(response.statusCode).toBe(200);
  });

  it('should login user using local auth', async () => {
    const { accessToken } = tokenPair;
    const loginData = {
      fingerprint: 'fingerprint',
      login: 'login',
      password: 'password',
    };
    const userAgent = 'user-agent';

    loginSpy.mockResolvedValue(tokenPair);
    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: loginData,
      headers: { 'user-agent': userAgent },
    });
    expect(loginSpy).toBeCalledWith(loginData, userAgent, 'local');

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ accessToken });

    const cookie = response.cookies[0];
    expect(cookie).toMatchObject(expectedCookie);
  });

  it('should generate new refresh token', async () => {
    const { accessToken, refreshToken } = tokenPair;
    const fingerprint = 'fingerprint';

    refreshTokenSpy.mockResolvedValue(tokenPair);
    const response = await app.inject({
      method: 'POST',
      url: '/auth/refresh',
      payload: { fingerprint },
      cookies: { refreshToken },
    });
    expect(refreshTokenSpy).toBeCalledWith(refreshToken, fingerprint);
    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({ accessToken });

    const cookie = response.cookies[0];
    expect(cookie).toMatchObject(expectedCookie);
  });

  it('should logout user', async () => {
    const { refreshToken } = tokenPair;
    const response = await app.inject({
      method: 'POST',
      url: '/auth/logout',
      cookies: { refreshToken },
    });
    expect(logoutSpy).toBeCalledWith(refreshToken);
    expect(response.statusCode).toBe(200);
  });
});
