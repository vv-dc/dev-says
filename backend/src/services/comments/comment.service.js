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
      returning: ['commentId'],
    });
    return rows[0].commentId;
  }
  async updateContent({ commentId, rawContent, updatedAt }) {
    return this.pg.update({
      changes: { rawContent, updatedAt },
      table: this.table,
      where: { commentId },
    });
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
