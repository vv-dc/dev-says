'use strict';

const fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../index');

function build(t, opts = {}) {
  const app = fastify();
  app.register(fp(App), { testing: true, ...opts });
  t.tearDown(app.close.bind(app));
  return app;
}

module.exports = { build };
