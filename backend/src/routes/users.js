'use strict';

const schema = require('../schemas/users');
const { UserService } = require('../services/users/user.service');

module.exports = async function (fastify) {
  const userService = new UserService();

  fastify.route({
    method: 'GET',
    path: '/users/:userId',
    schema: schema.getUser,
    handler: async (request, reply) => {
      const { userId } = request.params;
      const user = await userService.findById(userId);
      reply.send({ user });
    },
  });

  fastify.route({
    method: 'GET',
    path: '/users',
    schema: schema.getUser,
    handler: async (request, reply) => {
      const { username } = request.query;
      const user = await userService.findByUsername(username);
      reply.send({ user });
    },
  });

  fastify.route({
    method: 'GET',
    path: '/users/:userId/stats',
    schema: schema.getUserStats,
    handler: async (request, reply) => {
      const { userId } = request.params;
      const stats = await userService.getUserStats(userId);
      reply.send({ stats });
    },
  });
};
