'use strict';

const AutoLoad = require('fastify-autoload');
const Cors = require('fastify-cors');
const path = require('path');

require('dotenv').config();
const { DOMAIN, FRONTEND_PORT, PROTOCOL } = process.env;

module.exports = async function (fastify, opts) {
  fastify.register(Cors, {
    origin: `${PROTOCOL}://${DOMAIN}:${FRONTEND_PORT}`,
    credentials: true,
  });
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
};
