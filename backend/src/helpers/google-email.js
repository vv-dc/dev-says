'use strict';

const { Forbidden } = require('http-errors');
const axios = require('axios').default;

require('dotenv').config();
const {
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_TOKEN_URL,
  GOOGLE_API_URL,
  DOMAIN,
  FRONTEND_PORT,
} = process.env;

async function getGoogleEmail(authCode) {
  const token = await axios({
    method: 'POST',
    url: GOOGLE_TOKEN_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    data: new URLSearchParams({
      code: authCode,
      client_id: GOOGLE_ID,
      client_secret: GOOGLE_SECRET,
      redirect_uri: `http://${DOMAIN}:${FRONTEND_PORT}`,
      grant_type: 'authorization_code',
    }).toString(),
  });
  const info = await axios({
    method: 'GET',
    url: GOOGLE_API_URL,
    params: {
      id_token: token.data.id_token,
    },
  });
  const { data } = info;
  if (!data.email_verified) {
    throw new Forbidden('Email not verified');
  }
  return data.email;
}

module.exports = { getGoogleEmail };
