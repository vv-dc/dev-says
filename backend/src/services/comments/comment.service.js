'use strict';

const { PgApi } = require('../pg/pg.service');
const { formatComments } = require('./comment-utils');

class CommentService {
  constructor() {
    this.table = 'Comments';
    this.pg = new PgApi();
  }
  async add(comment) {
    const rows = await this.pg.insert({
      items: [comment],
      table: this.table,
      returning: ['commentId', 'postedAt'],
    });
    return rows[0];
  }
  async findByPostAndParent(postId, parentId) {
    const comments = await this.pg.callFunction({
      functionName: 'getCommentsByPostAndParent',
      params: [postId, parentId],
    });
    return formatComments(comments);
  }
}

module.exports = { CommentService };
