'use strict';

const { Forbidden } = require('http-errors');
const axios = require('axios').default;

require('dotenv').config();
const {
  GITHUB_ID,
  GITHUB_SECRET,
  GITHUB_ACCESS_URL,
  GITHUB_EMAIL_URL,
} = process.env;

async function getGithubEmail(authCode) {
  const token = await axios.post(
    GITHUB_ACCESS_URL,
    {
      client_id: GITHUB_ID,
      client_secret: GITHUB_SECRET,
      code: authCode,
    },
    { headers: { Accept: 'application/json' } }
  );
  const { access_token } = token.data;
  const emails = (
    await axios.get(GITHUB_EMAIL_URL, {
      headers: { Authorization: `token ${access_token}` },
    })
  ).data;
  const primary = emails.find(email => email.primary);
  if (!primary.verified) {
    throw new Forbidden('Email not verified!');
  }
  return primary.email;
}

module.exports = { getGithubEmail };
