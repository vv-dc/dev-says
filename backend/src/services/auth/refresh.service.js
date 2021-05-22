'use strict';

const { PgApi } = require('../pg/pg.service');

class RefreshService {
  constructor() {
    this.table = 'RefreshSessions';
    this.pg = new PgApi();
  }

  async save(session) {
    this.pg.insert({
      items: [session],
      table: this.table,
    });
  }

  async findByUser(userId) {
    return this.pg.find({
      table: this.table,
      where: { userId },
      order: {
        by: ['createdAt'],
        desc: false,
      },
    });
  }

  async findByFingerprint(userId, fingerprint) {
    return this.pg.findOne({
      table: this.table,
      where: { userId, fingerprint },
    });
  }

  async deleteAndGet(refreshToken) {
    const rows = await this.pg.delete({
      table: this.table,
      where: { refreshToken },
      returning: '*',
    });
    return rows ? rows[0] : null;
  }

  async delete(refreshToken) {
    return this.pg.delete({
      table: this.table,
      where: { refreshToken },
    });
  }
}

module.exports = { RefreshService };
