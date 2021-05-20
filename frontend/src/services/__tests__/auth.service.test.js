import axios from 'axios';
import store from '../../stores/auth-store';
import { AuthService } from '../auth.service';
import { AuthError } from '../../helpers/auth-error';
import { getFingerprint } from '../../helpers/get-fingerprint';
import { HttpError } from '../../helpers/http-error';

jest.mock('../../stores/auth-store');
jest.mock('../../helpers/get-fingerprint');

describe('AuthService', () => {
  const mockToken = {
    accessToken: 'accessToken',
  };

  const mockAuth = {
    username: 'username',
    email: 'email@email.com',
    login: 'login',
    password: 'password',
    authCode: 'authCode',
    authProvider: 'provider',
    fingerprint: 'fingerprint',
  };

  const mockStore = {
    user: { username: 'user' },
    userId: 12345,
    accessToken: mockToken.accessToken,
  };

  const mockResolved = { data: mockToken };
  const mockRejected = { response: { data: { message: 'Incorrect login' } } };

  const mockUnExpired = Number.MAX_VALUE;
  const mockExpired = 0;

  describe('login', () => {
    it('sets access token to the store on successfull local login', async () => {
      const { login, password, fingerprint } = mockAuth;
      const mockPost = axios.post.mockResolvedValue(mockResolved);
      const mockGetFingerprint = getFingerprint.mockResolvedValue(fingerprint);

      await AuthService.loginLocal(login, password);

      expect(mockGetFingerprint).toBeCalled();
      expect(mockPost).toBeCalledWith(
        '/auth/login',
        { login, password, fingerprint },
        { withCredentials: true }
      );
      expect(store.setAuthData).toBeCalledWith(mockToken);
    });

    it('throws an HttpError on invalid local login', async () => {
      const { login, password, fingerprint } = mockAuth;
      const mockPost = axios.post.mockRejectedValue(mockRejected);
      const mockGetFingerprint = getFingerprint.mockResolvedValue(fingerprint);

      const expectedError = new HttpError(mockRejected);
      await expect(AuthService.loginLocal(login, password)).rejects.toThrow(
        expectedError
      );
      expect(mockGetFingerprint).toBeCalled();
      expect(mockPost).toBeCalledWith(
        '/auth/login',
        { login, password, fingerprint },
        { withCredentials: true }
      );
      expect(store.setAuthData).not.toBeCalled();
    });

    it('sets access token to the store on successfull external login', async () => {
      const { authProvider, authCode, fingerprint } = mockAuth;
      const mockPost = axios.post.mockResolvedValue(mockResolved);
      const mockGetFingerprint = getFingerprint.mockResolvedValue(fingerprint);
      await AuthService.loginExternal(authProvider, authCode);

      expect(mockGetFingerprint).toBeCalled();
      expect(mockPost).toBeCalledWith(
        `/auth/login/${authProvider}`,
        { authCode, fingerprint },
        { withCredentials: true }
      );
      expect(store.setAuthData).toBeCalledWith(mockToken);
    });

    it('throws an HttpError on invalid external login', async () => {
      const { authProvider, authCode, fingerprint } = mockAuth;
      const mockPost = axios.post.mockRejectedValue(mockRejected);
      const mockGetFingerprint = getFingerprint.mockResolvedValue(fingerprint);

      const expectedError = new HttpError(mockRejected);
      await expect(
        AuthService.loginExternal(authProvider, authCode)
      ).rejects.toThrow(expectedError);

      expect(mockGetFingerprint).toBeCalled();
      expect(mockPost).toBeCalledWith(
        `/auth/login/${authProvider}`,
        { authCode, fingerprint },
        { withCredentials: true }
      );
      expect(store.setAuthData).not.toBeCalled();
    });
  });

  describe('register', () => {
    it('returns anything on successfull local register', async () => {
      const { email, username, password } = mockAuth;
      const mockPost = axios.post.mockResolvedValue(mockResolved);
      await AuthService.registerLocal(email, username, password);
      expect(mockPost).toBeCalledWith('/auth/register', {
        email,
        username,
        password,
      });
    });

    it('throws an HttpError on invalid local register', async () => {
      const { email, username, password } = mockAuth;
      const mockPost = axios.post.mockRejectedValue(mockRejected);

      const expectedError = new HttpError(mockRejected);
      await expect(
        AuthService.registerLocal(email, username, password)
      ).rejects.toThrow(expectedError);

      expect(mockPost).toBeCalledWith('/auth/register', {
        email,
        username,
        password,
      });
    });

    it('returns anything on successfull external register', async () => {
      const { authProvider, username, authCode } = mockAuth;
      const mockPost = axios.post.mockResolvedValue(mockResolved);
      await AuthService.registerExternal(authProvider, username, authCode);

      expect(mockPost).toBeCalledWith(`/auth/register/${authProvider}`, {
        username,
        authCode: decodeURIComponent(authCode),
      });
    });

    it('throws an HttpError on invalid external register', async () => {
      const { authProvider, username, authCode } = mockAuth;
      const mockPost = axios.post.mockRejectedValue(mockRejected);

      const expectedError = new HttpError(mockRejected);
      await expect(
        AuthService.registerExternal(authProvider, username, authCode)
      ).rejects.toThrow(expectedError);

      expect(mockPost).toBeCalledWith(`/auth/register/${authProvider}`, {
        username,
        authCode: decodeURIComponent(authCode),
      });
    });

    it('calls local register when provider is "local"', async () => {
      const { email, username, password } = mockAuth;
      const mockFormState = {
        authProvider: 'local',
        email,
        username,
        password,
      };
      const mockRegisterLocal = jest.spyOn(AuthService, 'registerLocal');

      await AuthService.register(mockFormState);
      expect(mockRegisterLocal).toBeCalledWith(email, username, password);
    });

    it('calls external register when provider is not "local"', async () => {
      const { username, authCode } = mockAuth;
      const mockFormState = { authProvider: 'external', username, authCode };
      const mockRegisterExternal = jest.spyOn(AuthService, 'registerExternal');

      await AuthService.register(mockFormState);
      expect(mockRegisterExternal).toBeCalledWith(
        'external',
        username,
        authCode
      );
    });
  });

  describe('logout', () => {
    it('clears data from the store', async () => {
      const mockPost = axios.post.mockResolvedValue();
      await AuthService.logout();

      expect(mockPost).toBeCalledWith('/auth/logout');
      expect(store.resetAuthData).toBeCalled();
    });
  });

  describe('refreshTokens', () => {
    it('sets access token to the store on success', async () => {
      const { fingerprint } = mockAuth;
      const mockPost = axios.post.mockResolvedValue(mockResolved);
      const mockGetFingerprint = getFingerprint.mockResolvedValue(fingerprint);
      await AuthService.refreshTokens();

      expect(mockGetFingerprint).toBeCalled();
      expect(mockPost).toBeCalledWith(
        '/auth/refresh',
        { fingerprint },
        { withCredentials: true }
      );
      expect(store.setAuthData).toBeCalledWith(mockToken);
    });

    it('clears data from the store on failure', async () => {
      const { fingerprint } = mockAuth;
      const mockPost = axios.post.mockRejectedValue(mockRejected);
      const mockGetFingerprint = getFingerprint.mockResolvedValue(fingerprint);
      await AuthService.refreshTokens();

      expect(mockGetFingerprint).toBeCalled();
      expect(mockPost).toBeCalledWith(
        '/auth/refresh',
        { fingerprint },
        { withCredentials: true }
      );
      expect(store.setAuthData).not.toBeCalledWith();
      expect(store.resetAuthData).toBeCalled();
    });
  });

  describe('IsAccessTokenExpired', () => {
    it('returns true when token is expired', () => {
      jest.spyOn(store, 'expiresAt', 'get').mockReturnValue(mockExpired);
      expect(AuthService.isAccessTokenExpired()).toBe(true);
    });

    it('returns false when token is not expired', () => {
      jest.spyOn(store, 'expiresAt', 'get').mockReturnValue(mockUnExpired);
      expect(AuthService.isAccessTokenExpired()).toBe(false);
    });
  });

  describe('IsAuthenticated', () => {
    it('returns true when user is authenticated', () => {
      const mockIsExpired = jest
        .spyOn(AuthService, 'isAccessTokenExpired')
        .mockReturnValue(false);
      jest
        .spyOn(store, 'accessToken', 'get')
        .mockReturnValue(mockStore.accessToken);

      expect(AuthService.isAuthenticated()).toBeTruthy();
      expect(mockIsExpired).toBeCalled();
    });

    it('returns false when user is not authenticated', () => {
      const mockIsExpired = jest
        .spyOn(AuthService, 'isAccessTokenExpired')
        .mockReturnValue(false);
      jest.spyOn(store, 'accessToken', 'get').mockReturnValue(null);

      expect(AuthService.isAccessTokenExpired()).toBeFalsy();
      expect(mockIsExpired).toBeCalled();
    });

    it('calls refreshTokens when token is expired', () => {
      const mockIsExpired = jest
        .spyOn(AuthService, 'isAccessTokenExpired')
        .mockReturnValue(true);
      const mockRefreshTokens = jest
        .spyOn(AuthService, 'refreshTokens')
        .mockResolvedValue();

      AuthService.isAuthenticated();
      expect(mockIsExpired).toBeCalled();
      expect(mockRefreshTokens).toBeCalled();
    });
  });

  describe('getters', () => {
    it('returns values when user is authenticated', () => {
      const { user, userId, accessToken } = mockStore;
      const mockIsAuthenticated = jest
        .spyOn(AuthService, 'isAuthenticated')
        .mockReturnValue(true);

      jest.spyOn(store, 'user', 'get').mockReturnValue(user);
      jest.spyOn(store, 'userId', 'get').mockReturnValue(userId);
      jest.spyOn(store, 'accessToken', 'get').mockReturnValue(accessToken);

      expect(AuthService.getUser()).toBe(user);
      expect(AuthService.getUserId()).toBe(userId);
      expect(AuthService.getAccessToken()).toBe(accessToken);
      expect(mockIsAuthenticated).toBeCalledTimes(3);
    });

    it('throws an error when user is not authenticated', () => {
      const mockIsAuthenticated = jest
        .spyOn(AuthService, 'isAuthenticated')
        .mockReturnValue(false);
      const expectedError = new AuthError();

      expect(() => AuthService.getUserId()).toThrow(expectedError);
      expect(() => AuthService.getUser()).toThrow(expectedError);
      expect(() => AuthService.getAccessToken()).toThrow(expectedError);
      expect(mockIsAuthenticated).toBeCalledTimes(3);
    });
  });
});
