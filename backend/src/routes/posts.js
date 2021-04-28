'use strict';

const schema = require('../schemas/post');
const { PostService } = require('../services/posts/post.service');

module.exports = async function (fastify) {
  const postService = new PostService();

  fastify.route({
    method: 'GET',
    path: '/posts/:postId',
    schema: schema.getPostOne,
    handler: async (request, reply) => {
      const { postId } = request.params;
      const post = await postService.findById(postId);
      reply.send({ post });
    },
  });

  fastify.route({
    method: 'GET',
    path: '/posts',
    schema: schema.getPostList,
    handler: async (request, reply) => {
      const posts = await postService.findByQuery(request.query);
      reply.send({ posts });
    },
  });

  fastify.route({
    method: 'GET',
    path: '/posts/:postId/scores/:userId',
    schema: schema.getPostScore,
    handler: async (request, reply) => {
      const { postId, userId } = request.params;
      const score = await postService.getUserScore(userId, postId);
      reply.send({ score });
    },
  });

  fastify.route({
    method: 'PUT',
    path: '/posts/:postId/scores/:userId',
    schema: schema.putPostScore,
    handler: async (request, reply) => {
      const { postId, userId } = request.params;
      const { score } = request.body;
      await postService.updateUserScore(userId, postId, score);
      reply.send();
    },
  });
};
