'use strict';

const findByLoginSpy = jest.fn();
const addUserSpy = jest.fn();
const findByUsernameSpy = jest.fn();
const findByEmailSpy = jest.fn();

module.exports = {
  UserService: jest.fn().mockImplementation(() => {
    return {
      findByLogin: findByLoginSpy,
      add: addUserSpy,
      findByUsername: findByUsernameSpy,
      findByEmail: findByEmailSpy,
    };
  }),
  findByLoginSpy,
  addUserSpy,
  findByUsernameSpy,
  findByEmailSpy,
};
