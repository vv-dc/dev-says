'use strict';

const { Forbidden } = require('http-errors');
const fetch = require('node-fetch');

require('dotenv').config();
const { GOOGLE_ID, GOOGLE_SECRET, FRONTEND_DOMAIN, PROTOCOL } = process.env;

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_API_URL = 'https://oauth2.googleapis.com/tokeninfo';

async function getGoogleEmail(authCode) {
  const responseToken = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body: new URLSearchParams({
      code: authCode,
      client_id: GOOGLE_ID,
      client_secret: GOOGLE_SECRET,
      redirect_uri: `${PROTOCOL}://${FRONTEND_DOMAIN}`,
      grant_type: 'authorization_code',
    }).toString(),
  });
  const { id_token } = await responseToken.json();

  const responseData = await fetch(
    `${GOOGLE_API_URL}?${new URLSearchParams({ id_token }).toString()}`
  );
  const data = await responseData.json();

  if (!data.email_verified) {
    throw new Forbidden('Email not verified');
  }
  return data.email;
}

module.exports = { getGoogleEmail };
