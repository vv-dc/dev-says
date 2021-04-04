'use strict';

const { PgApi } = require('../pg/pg.service');

class UserService {
  constructor() {
    this.table = 'Users';
    this.pg = new PgApi();
  }

  async findById(userId) {
    return this.pg.findOne({
      table: this.table,
      where: { userId },
    });
  }

  async findByEmail(email) {
    return this.pg.findOne({
      table: this.table,
      where: { email },
    });
  }

  async findByUsername(username) {
    return this.pg.findOne({
      table: this.table,
      where: { username },
    });
  }

  async userExists(email, username) {
    return this.findByEmail(email) || this.findByUsername(username);
  }

  async add(userData) {
    return this.pg.insert({
      items: [userData],
      table: this.table,
    });
  }
}

module.exports = { UserService };
