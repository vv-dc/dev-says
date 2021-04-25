'use strict';

const user = {
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            userId: { type: 'number' },
            username: { type: 'string' },
            email: { type: 'string' },
            fullName: { type: 'string' },
            imageURL: { type: 'string' },
            location: { type: 'string' },
            company: { type: 'string' },
            website: { type: 'string' },
            bio: { type: 'string' },
            isAdmin: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
};

module.exports = { user };
