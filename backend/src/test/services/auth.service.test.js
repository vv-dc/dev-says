'use strict';

const { v4: uuid } = require('uuid');
const { NotFound, Unauthorized, Forbidden, Conflict } = require('http-errors');
require('dotenv').config();

const { AuthService } = require('../../services/auth/auth.service');
const { JwtService } = require('../../services/auth/jwt.service');
const { getGithubEmail } = require('../../helpers/github-email');
const { getGoogleEmail } = require('../../helpers/google-email');

const {
  PasswordService,
  hashSpy,
  verifySpy,
} = require('../../services/auth/password.service');
const {
  ProviderService,
  findAuthSpy,
  addAuthSpy,
} = require('../../services/auth/provider.service');
const {
  RefreshService,
  deleteAndGetSpy,
  saveSpy,
  deleteSpy,
  findByUserSpy,
  findByFingerprintSpy,
} = require('../../services/auth/refresh.service');
const {
  UserService,
  findByLoginSpy,
  addUserSpy,
  findByUsernameSpy,
  findByEmailSpy,
} = require('../../services/users/user.service');

const REFRESH_EXPIRES_IN = +process.env.REFRESH_EXPIRES_IN;

jest.mock('uuid');
jest.mock('../../services/auth/refresh.service');
jest.mock('../../services/auth/password.service');
jest.mock('../../services/users/user.service');
jest.mock('../../services/auth/provider.service');

describe('auth service', () => {
  const authService = new AuthService();

  const externalAuthProvider = 'external';
  const localAuthProvider = 'local';
  const login = 'login';
  const password = 'password';
  const authCode = 'authCode';

  const refreshSession = {
    tokenId: 1,
    userId: 1,
    refreshToken: 'oldRefreshToken',
    userAgent: 'Mozilla/5.0',
    fingerprint: 'fingerprint',
    expiresIn: REFRESH_EXPIRES_IN,
    createdAt: new Date(),
  };
  const refreshSessions = [refreshSession, refreshSession];
  const auth = {
    authId: 1,
    userId: 1,
    authProviderId: 1,
    password: 'hashedPassword',
  };
  const user = {
    userId: 1,
    username: 'username',
    email: 'email@email.com',
    fullName: 'fullName',
    imageURL: 'image.jpg',
    backgroundURL: 'background.png',
    location: 'location',
    company: 'company',
    website: 'http://website.com',
    bio: 'bio',
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const sentTokenPair = {
    accessToken: 'accessToken',
    refreshToken: 'newRefreshToken',
  };

  beforeEach(() => {
    PasswordService.mockClear();
    ProviderService.mockClear();
    RefreshService.mockClear();
    UserService.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('logout', () => {
    const { refreshToken } = refreshSession;

    it('should throw an exception if there is no refresh session', async () => {
      deleteAndGetSpy.mockResolvedValue(undefined);

      await expect(authService.logout(refreshToken)).rejects.toThrow(
        new NotFound('No session')
      );
      expect(deleteAndGetSpy).toBeCalledWith(refreshToken);
    });

    it("shouldn't throw an exception if refresh session exists", async () => {
      deleteAndGetSpy.mockResolvedValue(refreshSession);

      await expect(authService.logout(refreshToken)).resolves.not.toThrow();
      expect(deleteAndGetSpy).toBeCalledWith(refreshToken);
    });
  });

  describe('refresh token', () => {
    const { refreshToken, fingerprint, userAgent } = refreshSession;
    const { userId } = user;

    it('should throw an exception if there is no refresh session', async () => {
      deleteAndGetSpy.mockResolvedValue(undefined);

      const expectedError = new NotFound('Invalid Refresh Session');
      await expect(
        authService.refreshToken(refreshToken, fingerprint)
      ).rejects.toThrow(expectedError);

      expect(deleteAndGetSpy).toBeCalledWith(refreshToken);
    });

    it('should throw an exception if refresh session is expired', async () => {
      const expiredSession = {
        ...refreshSession,
        createdAt: new Date(Date.now() - REFRESH_EXPIRES_IN - 1),
      };
      deleteAndGetSpy.mockResolvedValue(expiredSession);

      const expectedError = new Unauthorized('Token Expired');
      await expect(
        authService.refreshToken(refreshToken, fingerprint)
      ).rejects.toThrow(expectedError);

      expect(deleteAndGetSpy).toBeCalledWith(refreshToken);
    });

    it('should return new token pair If refresh session is correct', async () => {
      deleteAndGetSpy.mockResolvedValue(refreshSession);
      const addRefreshSessionSpy = jest
        .spyOn(authService, 'addRefreshSession')
        .mockResolvedValue(sentTokenPair);

      const tokenPair = await authService.refreshToken(
        refreshToken,
        fingerprint
      );
      expect(tokenPair).toEqual(sentTokenPair);
      expect(addRefreshSessionSpy).toBeCalledWith({
        userId,
        fingerprint,
        userAgent,
      });
      expect(deleteAndGetSpy).toBeCalledWith(refreshToken);
    });
  });

  describe('add refresh session', () => {
    const { refreshToken: newRefreshToken, accessToken } = sentTokenPair;
    const {
      refreshToken: oldRefreshToken,
      fingerprint,
      userAgent,
    } = refreshSession;
    const { userId } = user;

    let uuidSpy, signSpy;
    beforeEach(() => {
      signSpy = jest.spyOn(JwtService.prototype, 'sign');
      signSpy.mockResolvedValue(accessToken);

      uuidSpy = uuid.mockReturnValue(newRefreshToken);
      uuidSpy.mockClear();
    });

    it('should only add new refresh session if count of existed ones < MAX_SESSIONS', async () => {
      findByUserSpy.mockResolvedValue([refreshSession]);
      const tokenPair = await authService.addRefreshSession({
        userId,
        fingerprint,
        userAgent,
      });
      expect(tokenPair).toEqual(sentTokenPair);
      expect(uuidSpy).toBeCalledTimes(1);
      expect(signSpy).toBeCalledWith({ userId });
      expect(findByUserSpy).toBeCalledWith(userId);
      expect(saveSpy).toBeCalled();
      expect(deleteSpy).not.toBeCalled();
    });

    it('should delete the oldest refresh session and add new one if count of sessions >= MAX_SESSIONS', async () => {
      findByUserSpy.mockResolvedValue(refreshSessions);
      const tokenPair = await authService.addRefreshSession({
        userId,
        fingerprint,
        userAgent,
      });
      expect(tokenPair).toEqual(sentTokenPair);
      expect(uuidSpy).toBeCalledTimes(1);
      expect(signSpy).toBeCalledWith({ userId });
      expect(findByUserSpy).toBeCalledWith(userId);
      expect(saveSpy).toBeCalled();
      expect(deleteSpy).toBeCalledWith(oldRefreshToken);
    });
  });

  describe('login', () => {
    const { userAgent, fingerprint } = refreshSession;
    const { password: hashedPassword } = auth;
    const { userId } = user;

    let addRefreshSessionSpy;
    beforeEach(() => {
      addRefreshSessionSpy = jest.spyOn(authService, 'addRefreshSession');
      addRefreshSessionSpy.mockResolvedValue(sentTokenPair);
    });

    it('should throw an error if user with such login does not exist', async () => {
      findByLoginSpy.mockResolvedValue(undefined);

      const expectedError = new Forbidden('Incorrect login');
      await expect(
        authService.login(
          { login, password, fingerprint },
          userAgent,
          localAuthProvider
        )
      ).rejects.toThrow(expectedError);

      expect(findByLoginSpy).toBeCalledWith(login);
    });

    it('should throw an error if user is already logged in', async () => {
      findByFingerprintSpy.mockResolvedValue(refreshSession);
      findByLoginSpy.mockResolvedValue(user);

      const expectedError = new Forbidden('Already logged in');
      await expect(
        authService.login(
          { login, password, fingerprint },
          userAgent,
          localAuthProvider
        )
      ).rejects.toThrow(expectedError);

      expect(findByFingerprintSpy).toBeCalledWith(userId, fingerprint);
      expect(findByLoginSpy).toBeCalledWith(login);
    });

    it('should throw an error if invalid auth provider is used', async () => {
      findByFingerprintSpy.mockResolvedValue(undefined);
      findByLoginSpy.mockResolvedValue(user);
      findAuthSpy.mockResolvedValue(undefined);

      const expectedError = new Forbidden('Invalid auth provider');
      await expect(
        authService.login(
          { login, password, fingerprint },
          userAgent,
          localAuthProvider
        )
      ).rejects.toThrow(expectedError);

      expect(findByFingerprintSpy).toBeCalledWith(userId, fingerprint);
      expect(findByLoginSpy).toBeCalledWith(login);
      expect(findAuthSpy).toBeCalledWith(userId, localAuthProvider);
    });

    it('should throw an error if incorrect password is used', async () => {
      findByFingerprintSpy.mockResolvedValue(undefined);
      findByLoginSpy.mockResolvedValue(user);
      findAuthSpy.mockResolvedValue(auth);
      verifySpy.mockResolvedValue(false);

      const expectedError = new Forbidden('Incorrect password');
      await expect(
        authService.login(
          { login, password, fingerprint },
          userAgent,
          localAuthProvider
        )
      ).rejects.toThrow(expectedError);

      expect(findByFingerprintSpy).toBeCalledWith(userId, fingerprint);
      expect(findByLoginSpy).toBeCalledWith(login);
      expect(findAuthSpy).toBeCalledWith(userId, localAuthProvider);
      expect(verifySpy).toBeCalledWith(hashedPassword, password);
    });

    it('should login user using local auth', async () => {
      findByFingerprintSpy.mockResolvedValue(undefined);
      findByLoginSpy.mockResolvedValue(user);
      findAuthSpy.mockResolvedValue(auth);
      verifySpy.mockResolvedValue(true);

      const tokenPair = await authService.login(
        { login, password, fingerprint },
        userAgent,
        localAuthProvider
      );
      expect(tokenPair).toEqual(sentTokenPair);
      expect(addRefreshSessionSpy).toBeCalledWith({
        userId,
        fingerprint,
        userAgent,
      });
      expect(findByFingerprintSpy).toBeCalledWith(userId, fingerprint);
      expect(findByLoginSpy).toBeCalledWith(login);
      expect(findAuthSpy).toBeCalledWith(userId, localAuthProvider);
      expect(verifySpy).toBeCalledWith(hashedPassword, password);
    });

    it('should login user using external auth', async () => {
      findByFingerprintSpy.mockResolvedValue(undefined);
      findByLoginSpy.mockResolvedValue(user);
      findAuthSpy.mockResolvedValue(auth);

      const tokenPair = await authService.login(
        { login, password, fingerprint },
        userAgent,
        externalAuthProvider
      );
      expect(tokenPair).toEqual(sentTokenPair);
      expect(addRefreshSessionSpy).toBeCalledWith({
        userId,
        fingerprint,
        userAgent,
      });
      expect(findByFingerprintSpy).toBeCalledWith(userId, fingerprint);
      expect(findByLoginSpy).toBeCalledWith(login);
      expect(findAuthSpy).toBeCalledWith(userId, externalAuthProvider);
    });
  });

  describe('register', () => {
    const { password: hashedPassword } = auth;
    const { userId, email, username } = user;

    beforeEach(() => {
      addAuthSpy.mockResolvedValue(undefined);
      addUserSpy.mockResolvedValue(user);
    });

    it('should throw an error if username has already been picked', async () => {
      findByUsernameSpy.mockResolvedValue(user);

      const expectedError = new Conflict('Username already picked');
      await expect(
        authService.register({ email, password, username }, localAuthProvider)
      ).rejects.toThrow(expectedError);

      expect(findByUsernameSpy).toBeCalledWith(username);
    });

    it('should throw an error if email has already been used', async () => {
      findByUsernameSpy.mockResolvedValue(undefined);
      findByEmailSpy.mockResolvedValue(user);

      const expectedError = new Conflict('Email already picked');
      await expect(
        authService.register({ email, password, username }, localAuthProvider)
      ).rejects.toThrow(expectedError);

      expect(findByUsernameSpy).toBeCalledWith(username);
      expect(findByEmailSpy).toBeCalledWith(email);
    });

    it('should register user using local auth', async () => {
      findByUsernameSpy.mockResolvedValue(undefined);
      findByEmailSpy.mockResolvedValue(undefined);
      hashSpy.mockResolvedValue(hashedPassword);

      await expect(
        authService.register({ email, password, username }, localAuthProvider)
      ).resolves.not.toThrow();

      expect(findByUsernameSpy).toBeCalledWith(username);
      expect(findByEmailSpy).toBeCalledWith(email);
      expect(addAuthSpy).toBeCalledWith({
        userId,
        password: hashedPassword,
        authProvider: localAuthProvider,
      });
      expect(hashSpy).toBeCalledWith(password);
      expect(addUserSpy).toBeCalledWith({ email, username });
    });

    it('should register user using external auth', async () => {
      findByEmailSpy.mockResolvedValue(undefined);
      await expect(
        authService.register(
          { email, password, username },
          externalAuthProvider
        )
      ).resolves.not.toThrow();
      expect(findByEmailSpy).toBeCalledWith(email);
      expect(addAuthSpy).toBeCalledWith({
        userId,
        password: undefined,
        authProvider: externalAuthProvider,
      });
      expect(addUserSpy).toBeCalledWith({ email, username });
    });
  });

  describe('register using external service', () => {
    const { email, username } = user;

    let getEmailSpy, registerSpy;
    beforeEach(() => {
      registerSpy = jest.spyOn(authService, 'register').mockResolvedValue();
      getEmailSpy = jest.fn();
    });

    it('should throw an error if username has already been picked', async () => {
      findByUsernameSpy.mockResolvedValue(user);

      const expectedError = new Conflict('Username already picked');
      await expect(
        authService.registerExternal(
          authCode,
          username,
          externalAuthProvider,
          getEmailSpy
        )
      ).rejects.toThrow(expectedError);

      expect(findByUsernameSpy).toBeCalledWith(username);
    });

    it('should throw an error if user credentials for external service are invalid', async () => {
      const error = new Error();

      getEmailSpy.mockRejectedValue(error);
      findByUsernameSpy.mockResolvedValue(undefined);

      await expect(
        authService.registerExternal(
          authCode,
          username,
          externalAuthProvider,
          getEmailSpy
        )
      ).rejects.toThrow(error);

      expect(findByUsernameSpy).toBeCalledWith(username);
      expect(getEmailSpy).toBeCalledWith(authCode);
    });

    it('should register user using external service', async () => {
      getEmailSpy.mockResolvedValue(email);
      findByUsernameSpy.mockResolvedValue(undefined);

      await expect(
        authService.registerExternal(
          authCode,
          username,
          externalAuthProvider,
          getEmailSpy
        )
      ).resolves.not.toThrow();

      expect(findByUsernameSpy).toBeCalledWith(username);
      expect(registerSpy).toBeCalledWith(
        { email, username },
        externalAuthProvider
      );
      expect(getEmailSpy).toBeCalledWith(authCode);
    });
  });

  describe('register via Google and GitHub', () => {
    const { username } = user;

    let registerExternalSpy;
    beforeEach(() => {
      registerExternalSpy = jest.spyOn(authService, 'registerExternal');
      registerExternalSpy.mockResolvedValue(undefined);
    });

    it('should register user via Google', async () => {
      await expect(
        authService.registerGoogle({
          authCode,
          username,
        })
      ).resolves.not.toThrow();
      expect(registerExternalSpy).toBeCalledWith(
        authCode,
        username,
        'google',
        getGoogleEmail
      );
    });

    it('should register user via GitHub', async () => {
      await expect(
        authService.registerGithub({
          authCode,
          username,
        })
      ).resolves.not.toThrow();
      expect(registerExternalSpy).toBeCalledWith(
        authCode,
        username,
        'github',
        getGithubEmail
      );
    });
  });
});
