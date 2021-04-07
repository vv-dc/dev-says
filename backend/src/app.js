'use strict';

const AutoLoad = require('fastify-autoload');
const path = require('path');

require('dotenv').config();
const { DOMAIN } = process.env;

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-cors'), {
    origin: `http://${DOMAIN}`,
    credentials: true,
  });
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
};
