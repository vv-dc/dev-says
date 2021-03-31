'use strict';

const AutoLoad = require('fastify-autoload');
const path = require('path');

module.exports = async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({ prefix: '/api' }, opts),
  });
};
