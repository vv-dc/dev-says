'use strict';

const findAuthSpy = jest.fn();
const addAuthSpy = jest.fn();

module.exports = {
  ProviderService: jest.fn().mockImplementation(() => {
    return {
      findAuth: findAuthSpy,
      addAuth: addAuthSpy,
    };
  }),
  findAuthSpy,
  addAuthSpy,
};
