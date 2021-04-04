'use strict';

const { v4: uuid } = require('uuid');
const { Conflict, Unauthorized, Forbidden, NotFound } = require('http-errors');
require('dotenv').config();

const { RefreshService } = require('./refresh.service');
const { UserService } = require('../users/user.service');
const { JwtService } = require('./jwt.service');
const { HashService } = require('./hash.service');

const { MAX_SESSIONS, REFRESH_EXPIRES_IN } = process.env;

class AuthService {
  constructor() {
    this.refreshService = new RefreshService();
    this.userService = new UserService();
    this.jwtService = new JwtService();
    this.hashService = new HashService();
  }

  async register(email, pass, username) {
    if (await this.userService.userExists(email, username)) {
      throw new Conflict('User already exists');
    }
    const password = await this.hashService.hash(pass);
    await this.userService.add({ email, password, username });
  }

  async login(login, password, fingerprint, userAgent) {
    const criterion = login.includes('@') ? 'Email' : 'Username';
    const user = await this.userService[`findBy${criterion}`](login);

    if (!user) throw new Forbidden('Incorrect login');
    if (!(await this.hashService.verify(user.password, password))) {
      throw new Forbidden('Incorrect password');
    }
    const { userId } = user;
    return this.addRefreshSesssion({ userId, fingerprint, userAgent });
  }

  async refreshToken(refreshToken, fingerprint) {
    const session = await this.refreshService.deleteAndGet(refreshToken);
    if (!session || fingerprint !== session.fingerprint) {
      throw new NotFound('Invalid Refresh Session');
    }
    const { expiresIn, createdAt } = session;
    const expireDate = createdAt.getTime() + expiresIn;
    const now = Date.now();

    if (expireDate < now) {
      throw new Unauthorized('Token Expired');
    }
    const { userId, userAgent } = session;
    return this.addRefreshSesssion({ userId, fingerprint, userAgent });
  }

  async addRefreshSesssion({ userId, fingerprint, userAgent }) {
    const accessToken = await this.jwtService.sign({ userId });
    const refreshToken = uuid();

    const sessions = await this.refreshService.findByUser(userId);
    if (MAX_SESSIONS - sessions.length < 1) {
      await this.refreshService.delete(sessions[0].refreshToken);
    }
    await this.refreshService.save({
      userId,
      refreshToken,
      userAgent,
      fingerprint,
      expiresIn: REFRESH_EXPIRES_IN,
      createdAt: new Date(),
    });
    return { accessToken, refreshToken };
  }

  async logout(refreshToken) {
    const session = await this.refreshService.deleteAndGet(refreshToken);
    if (!session) throw new NotFound('No session');
  }
}

module.exports = { AuthService };
