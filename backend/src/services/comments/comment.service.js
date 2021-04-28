'use strict';

const { PgApi } = require('../pg/pg.service');
const { formatComments } = require('./comment-utils');

class CommentService {
  constructor() {
    this.table = 'Comments';
    this.pg = new PgApi();
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
