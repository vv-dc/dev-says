'use strict';

const { Forbidden } = require('http-errors');
const axios = require('axios').default;

require('dotenv').config();
const {
  GITHUB_ID,
  GITHUB_SECRET,
  GITHUB_TOKEN_URL,
  GITHUB_API_URL,
} = process.env;

async function getGithubEmail(authCode) {
  const token = await axios({
    method: 'POST',
    url: GITHUB_TOKEN_URL,
    data: {
      client_id: GITHUB_ID,
      client_secret: GITHUB_SECRET,
      code: authCode,
    },
    headers: { Accept: 'application/json' },
  });
  const { access_token } = token.data;
  const emails = await axios({
    method: 'GET',
    url: GITHUB_API_URL,
    headers: { Authorization: `token ${access_token}` },
  });
  const primary = emails.data.find(email => email.primary);
  if (!primary.verified) {
    throw new Forbidden('Email not verified');
  }
  return primary.email;
}

module.exports = { getGithubEmail };
