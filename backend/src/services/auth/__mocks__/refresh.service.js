'use strict';

const deleteAndGetSpy = jest.fn();
const saveSpy = jest.fn();
const deleteSpy = jest.fn();
const findByUserSpy = jest.fn();
const findByFingerprintSpy = jest.fn();

module.exports = {
  RefreshService: jest.fn().mockImplementation(() => {
    return {
      deleteAndGet: deleteAndGetSpy,
      save: saveSpy,
      delete: deleteSpy,
      findByUser: findByUserSpy,
      findByFingerprint: findByFingerprintSpy,
    };
  }),
  deleteAndGetSpy,
  saveSpy,
  deleteSpy,
  findByUserSpy,
  findByFingerprintSpy,
};
