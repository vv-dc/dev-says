'use strict';

const { build } = require('../helper');

const app = build();

test('GET `/` route', async () => {
  const res = await app.inject({
    method: 'GET',
    url: '/',
  });
  expect(res.json()).toEqual({ message: 'Hello from DevSays' });
});
