'use strict';

const { PgApi } = require('../pg/pg.service');

class PostService {
  constructor() {
    this.table = 'Posts';
    this.pg = new PgApi();
  }

  async findById(postId) {
    const rows = await this.pg.executeFunction('getPostById', [postId]);
    return rows[0];
  }

  async findByTag(tag) {
    return this.pg.executeFunction('getPostsByTag', [tag]);
  }
}

module.exports = { PostService };
