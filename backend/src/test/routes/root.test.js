'use strict';

const { build } = require('../helper');

const app = build();

test('GET `/api` route', async () => {
  const res = await app.inject({
    method: 'GET',
    url: '/api',
  });
  expect(res.json()).toEqual({ message: 'Hello from DevSays' });
});
