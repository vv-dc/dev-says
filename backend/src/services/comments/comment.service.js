'use strict';

const { PgApi } = require('../pg/pg.service');
const { formatComments } = require('./comment-utils');

class CommentService {
  constructor() {
    this.table = 'Comments';
    this.pg = new PgApi();
  }

  async add(comment) {
    return this.pg.insert({
      items: [comment],
      table: this.table,
    });
  }

  async findByPostAndParent(postId, parentId) {
    const comments = await this.pg.callFunction({
      functionName: 'getCommentsByPostAndParent',
      params: [postId, parentId],
    });
    return formatComments(comments);
  }

  async update(commentId, rawContent) {
    return this.pg.update({
      changes: {
        rawContent,
        updatedAt: new Date(),
      },
      table: this.table,
      where: { commentId },
    });
  }

  async delete(commentId) {
    return this.pg.delete({
      table: this.table,
      where: { commentId },
    });
  }
}

module.exports = { CommentService };
