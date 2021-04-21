'use strict';

const schema = require('../schemas/post');
const { PostService } = require('../services/posts/post.service');

module.exports = async function (fastify) {
  const postService = new PostService();

  fastify.route({
    method: 'GET',
    path: '/posts/:postId',
    schema: schema.postOne,
    handler: async (request, reply) => {
      const { postId } = request.params;
      const post = await postService.findById(postId);
      reply.send({ post });
    },
  });

  fastify.route({
    method: 'GET',
    path: '/posts',
    schema: schema.postList,
    handler: async (request, reply) => {
      const posts = await postService.findByQuery(request.query);
      reply.send({ posts });
    },
  });
};
