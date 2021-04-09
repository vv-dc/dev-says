'use strict';

const { v4: uuid } = require('uuid');
const { Conflict, Unauthorized, Forbidden, NotFound } = require('http-errors');
require('dotenv').config();

const { RefreshService } = require('./refresh.service');
const { UserService } = require('../users/user.service');
const { JwtService } = require('./jwt.service');
const { PasswordService } = require('./password.service');
const { ProviderService } = require('./provider.service');
const { getGithubEmail } = require('../../helpers/github-email');
const { getGoogleEmail } = require('../../helpers/google-email');

const { MAX_SESSIONS, REFRESH_EXPIRES_IN } = process.env;

class AuthService {
  constructor() {
    this.refreshService = new RefreshService();
    this.userService = new UserService();
    this.jwtService = new JwtService();
    this.passwordService = new PasswordService();
    this.providerService = new ProviderService();
  }

  async register({ email, password, username }, authProvider) {
    const isLocal = authProvider === 'local';
    if (isLocal && (await this.userService.findByUsername(username))) {
      throw new Conflict('Username already picked');
    }
    if (await this.userService.findByEmail(email)) {
      throw new Conflict('Email already picked');
    }
    const hashedPassword = isLocal
      ? await this.passwordService.hash(password)
      : undefined;
    const { userId } = await this.userService.add({ email, username });

    await this.providerService.addAuth({
      userId,
      password: hashedPassword,
      authProvider,
    });
  }

  async registerExternal(authCode, username, authProvider, getEmail) {
    if (await this.userService.findByUsername(username)) {
      throw new Conflict('Username already picked');
    }
    const email = await getEmail(authCode);
    await this.register({ email, username }, authProvider);
  }

  async registerGoogle({ authCode, username }) {
    await this.registerExternal(authCode, username, 'google', getGoogleEmail);
  }

  async registerGithub({ authCode, username }) {
    await this.registerExternal(authCode, username, 'github', getGithubEmail);
  }

  async login({ login, password, fingerprint }, userAgent, authProvider) {
    const user = await this.userService.findByLogin(login);
    if (!user) throw new Forbidden('Incorrect login');

    const { userId } = user;
    if (await this.refreshService.findByFingerprint(userId, fingerprint)) {
      throw new Forbidden('Already logged in');
    }
    const auth = await this.providerService.findAuth(userId, authProvider);
    if (!auth) throw new Forbidden('Invalid auth provider');

    const { password: hashedPassword } = auth;
    if (
      authProvider === 'local' &&
      !(await this.passwordService.verify(hashedPassword, password))
    ) {
      throw new Forbidden('Incorrect password');
    }
    return this.addRefreshSesssion({ userId, fingerprint, userAgent });
  }

  async loginGithub({ authCode, fingerprint }, userAgent) {
    const email = await getGithubEmail(authCode);
    return this.login({ login: email, fingerprint }, userAgent, 'github');
  }

  async loginGoogle({ authCode, fingerprint }, userAgent) {
    const email = await getGoogleEmail(authCode);
    return this.login({ login: email, fingerprint }, userAgent, 'google');
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
