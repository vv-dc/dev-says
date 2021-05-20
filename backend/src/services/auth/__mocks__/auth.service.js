'use strict';

const registerSpy = jest.fn();
const loginSpy = jest.fn();
const refreshTokenSpy = jest.fn();
const logoutSpy = jest.fn();

module.exports = {
  AuthService: jest.fn().mockImplementation(() => {
    return {
      register: registerSpy,
      login: loginSpy,
      logout: logoutSpy,
      refreshToken: refreshTokenSpy,
    };
  }),
  registerSpy,
  loginSpy,
  logoutSpy,
  refreshTokenSpy,
};
