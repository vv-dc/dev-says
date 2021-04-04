'use strict';

const argon2 = require('argon2');

class HashService {
  constructor(options = {}) {
    this.options = options
      ? options
      : {
          type: argon2.argon2id,
          timeCost: 2,
          memoryCost: 15360,
        };
  }
  async hash(password) {
    return argon2.hash(password, this.options);
  }
  async verify(hash, password) {
    return argon2.verify(hash, password, this.options);
  }
}

module.exports = { HashService };
