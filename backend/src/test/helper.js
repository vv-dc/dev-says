'use strict';

const fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../app');

function build() {
  const app = fastify();

  beforeAll(async () => {
    app.register(fp(App));
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  return app;
}

module.exports = { build };
