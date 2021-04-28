'use strict';

const schema = require('../schemas/comments');
const { CommentService } = require('../services/comments/comment.service');

module.exports = async function (fastify) {
  const commentService = new CommentService();

  fastify.route({
    method: 'GET',
    path: '/posts/:postId/comments/:parentId',
    schema: schema.getComments,
    handler: async (request, reply) => {
      const { postId, parentId } = request.params;
      const comments = await commentService.findByPostAndParent(
        postId,
        parentId
      );
      reply.send({ comments });
    },
  });
};
