'use strict';

const { PgApi } = require('../pg/pg.service');

class PostService {
  constructor() {
    this.table = 'Posts';
    this.pg = new PgApi();
    this.searchOptions = ['tag', 'userId', 'username'];
  }

  async findById(postId) {
    const rows = await this.pg.callFunction({
      functionName: 'getPostById',
      params: [postId],
    });
    return rows[0];
  }

  async findByUserId(userId) {
    return this.pg.callFunction({
      functionName: 'getPostsByUserId',
      params: [userId],
    });
  }

  async findByTag(tag) {
    return this.pg.callFunction({
      functionName: 'getPostsByTag',
      params: [tag],
    });
  }

  async findByUsername(username) {
    return this.pg.callFunction({
      functionName: 'getPostsByUsername',
      params: [username],
    });
  }

  async findByQuery(query) {
    const [key, value] = Object.entries(query)[0];
    if (this.searchOptions.includes(key)) {
      const capKey = key[0].toUpperCase() + key.slice(1);
      const functionName = `findBy${capKey}`;
      return this[functionName](value);
    }
    return [];
  }

  async getUserScore(userId, postId) {
    const row = await this.pg.findOne({
      fields: ['score'],
      table: 'PostScores',
      where: { userId, postId },
    });
    return (row && row.score) || 0;
  }

  async updateUserScore(userId, postId, score) {
    const query = 'CALL "updatePostUserScore"($1, $2, $3)';
    await this.pg.execute(query, [userId, postId, score]);
  }
}

module.exports = { PostService };
