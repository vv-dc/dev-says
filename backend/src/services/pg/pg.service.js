'use strict';

const { Pool } = require('pg');
class PgApi {
  constructor() {
    this.pool = new Pool();
  }

  where(where, index = 0) {
    const whereClause = where
      ? ' WHERE ' +
        Object.entries(where)
          .map(([key, value]) => {
            let sql = `"${key}"`;
            if (Array.isArray(value)) {
              sql += ' IN (' + value.map(() => `$${++index}`).join(',') + ')';
            } else {
              sql += `=$${++index}`;
            }
            return sql;
          })
          .join(` AND `)
      : '';
    return whereClause;
  }

  returnValues(returning) {
    const returned = returning
      ? ' RETURNING ' +
        (returning === '*' ? '*' : returning.map(key => `"${key}"`).join(','))
      : '';
    return returned;
  }

  async insert({ items, table, returning }) {
    const keys = Object.keys(items[0])
      .map(key => `"${key}"`)
      .join(',');

    const returned = this.returnValues(returning);
    let index = 0;

    const query =
      `INSERT INTO "${table}" (${keys}) VALUES` +
      items
        .map(
          item =>
            '(' +
            Object.values(item)
              .map(() => `$${++index}`)
              .join(',') +
            ')'
        )
        .join(',') +
      returned;

    const params = items.map(item => Object.values(item)).flat();
    return this.execute(query, params);
  }

  async find({ fields, table, where, order, limit }) {
    const keys = fields ? fields.map(key => `"${key}"`).join(',') : '*';

    const whereClause = this.where(where);
    const orderClause = order
      ? ' ORDER BY (' +
        order.by.map(key => `"${key}"`).join(',') +
        ') ' +
        (order.desc ? 'DESC' : '')
      : '';

    const query =
      `SELECT ${keys} FROM "${table}"` +
      whereClause +
      orderClause +
      (limit ? ` LIMIT ${limit}` : '');

    const params = where ? Object.values(where).flat() : [];
    return this.execute(query, params);
  }

  async findOne(params) {
    const rows = await this.find({ ...params, limit: 1 });
    return rows[0];
  }

  async delete({ table, where, returning }) {
    const query =
      `DELETE FROM "${table}"` +
      this.where(where) +
      this.returnValues(returning);

    const params = where ? Object.values(where) : [];
    return this.execute(query, params);
  }

  async update({ changes, table, where, returning }) {
    const returned = this.returnValues(returning);
    let index = 0;

    const query =
      `UPDATE "${table}" ` +
      'SET ' +
      Object.keys(changes)
        .map(key => `"${key}"=$${++index}`)
        .join(',') +
      this.where(where, index) +
      returned;

    const params = [
      Object.values(changes),
      where ? Object.values(where) : [],
    ].flat();

    return this.execute(query, params);
  }

  async execute(query, params = []) {
    try {
      const rows = await this.pool.query(query, params);
      return rows.rows;
    } catch (error) {
      return error;
    }
  }

  async executeFunction(funcName, params = []) {
    const keys = Array.from(
      { length: params.length },
      (_, i) => `$${i + 1}`
    ).join(',');
    const query = `SELECT * FROM ${funcName}(${keys})`;
    return this.execute(query, params);
  }
}

module.exports = { PgApi };
