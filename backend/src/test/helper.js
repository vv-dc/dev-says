'use strict';

const fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../app');

function build(options = {}) {
  const app = fastify(options);

  beforeAll(async () => {
    app.register(fp(App), { testing: true, ...options });
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  return app;
}

module.exports = { build };
