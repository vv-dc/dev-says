'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const { ACCESS_EXPIRES_IN } = require('../../consts').auth;

class JwtService {
  sign(payload) {
    const options = { expiresIn: +ACCESS_EXPIRES_IN };
    return new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET, options, (error, token) =>
        error ? reject(error) : resolve(token)
      );
    });
  }
  verify(payload) {
    return new Promise((resolve, reject) => {
      jwt.verify(payload, JWT_SECRET, (error, decoded) =>
        error ? reject(error) : resolve(decoded)
      );
    });
  }
}

module.exports = { JwtService };
