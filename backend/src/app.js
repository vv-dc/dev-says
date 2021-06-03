'use strict';

const AutoLoad = require('fastify-autoload');
const Cors = require('fastify-cors');
const path = require('path');

require('dotenv').config();
const { FRONTEND_DOMAIN, PROTOCOL, FRONTEND_PORT } = process.env;

module.exports = async function (fastify, options) {
  fastify.register(Cors, {
    origin: `${PROTOCOL}://${FRONTEND_DOMAIN}${
      FRONTEND_PORT ? ':' + FRONTEND_PORT : ''
    }`,
    credentials: true,
  });
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, options),
  });
};
