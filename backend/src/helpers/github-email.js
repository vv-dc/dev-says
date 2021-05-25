'use strict';

const { Forbidden } = require('http-errors');
const fetch = require('node-fetch');

require('dotenv').config();
const { GITHUB_ID, GITHUB_SECRET } = process.env;

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_URL = 'https://api.github.com/user/emails';

async function getGithubEmail(authCode) {
  const responseToken = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify({
      client_id: GITHUB_ID,
      client_secret: GITHUB_SECRET,
      code: authCode,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const { access_token } = await responseToken.json();

  const responseData = await fetch(GITHUB_API_URL, {
    headers: { Authorization: `token ${access_token}` },
  });
  const emails = await responseData.json();

  const primary = emails.find(email => email.primary);
  if (!primary.verified) {
    throw new Forbidden('Email not verified');
  }
  return primary.email;
}

module.exports = { getGithubEmail };
