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

  fastify.route({
    method: 'POST',
    path: '/posts/:postId/comments/:parentId',
    schema: schema.postComment,
    handler: async (request, reply) => {
      const { postedAt } = request.body;
      const commentId = await commentService.add({
        ...request.params,
        ...request.body,
        updatedAt: postedAt,
      });
      reply.send({ commentId });
    },
  });

  fastify.route({
    method: 'PUT',
    path: '/comments/:commentId',
    schema: schema.putComment,
    handler: async (request, reply) => {
      await commentService.updateContent({
        ...request.params,
        ...request.body,
      });
      reply.send();
    },
  });
};
