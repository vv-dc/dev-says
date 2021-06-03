'use strict';

const schemas = require('../schemas/root');

module.exports = async function (fastify) {
  fastify.get('/', { schemas: schemas.hello }, async function () {
    return { message: 'Hello from DevSays' };
  });
};
