'use strict';

const { build } = require('../helper');
const { test } = require('tap');

test('GET /', async t => {
  const app = build(t);
  const res = await app.inject({
    method: 'GET',
    url: '/',
  });
  t.deepEqual(JSON.parse(res.payload), { message: 'Hello from DevSays' });
});
