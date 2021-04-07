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

  async findByLogin(login) {
    return (
      await this.pg.execute(
        `SELECT * FROM "Users"
         WHERE "email"=$1 OR "username"=$1`,
        [login]
      )
    )[0];
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

  async add(userData) {
    return (
      await this.pg.insert({
        items: [userData],
        table: this.table,
        returning: ['userId'],
      })
    )[0];
  }
}

module.exports = { UserService };
