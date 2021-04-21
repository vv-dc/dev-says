'use strict';

const { PgApi } = require('../pg/pg.service');

class PostService {
  constructor() {
    this.table = 'Posts';
    this.pg = new PgApi();
    this.searchOptions = ['tag', 'username', 'userId'];
  }

  async findById(postId) {
    const rows = await this.pg.executeFunction('getPostById', [postId]);
    return rows[0];
  }

  async findByQuery(query) {
    const option = this.searchOptions.filter(option => query[option])[0];
    if (option) {
      const functionName = `getPostsBy${option}`;
      return this.pg.executeFunction(functionName, [query[option]]);
    }
    return [];
  }
}

module.exports = { PostService };
