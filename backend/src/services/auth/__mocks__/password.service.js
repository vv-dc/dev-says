'use strict';

const verifySpy = jest.fn();
const hashSpy = jest.fn();

module.exports = {
  PasswordService: jest.fn().mockImplementation(() => {
    return {
      verify: verifySpy,
      hash: hashSpy,
    };
  }),
  verifySpy,
  hashSpy,
};
