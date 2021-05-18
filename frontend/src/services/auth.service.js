import AuthStore from '../stores/auth-store';
import { HttpService } from './http.service';
import { getFingerprint } from '../helpers/get-fingerprint';
import { AuthError } from '../helpers/auth-error';
import { HttpError } from '../helpers/http-error';

const http = new HttpService({ withAuth: false });

export class AuthService {
  static async loginLocal(login, password) {
    try {
      const fingerprint = await getFingerprint();
      const response = await http.post(
        '/auth/login',
        { login, password, fingerprint },
        { withCredentials: true }
      );
      AuthStore.setAuthData(response.data);
    } catch (error) {
      throw new HttpError(error);
    }
  }

  static async loginExternal(authProvider, authCode) {
    try {
      const fingerprint = await getFingerprint();
      const response = await http.post(
        `auth/login/${authProvider}`,
        {
          authCode: decodeURIComponent(authCode),
          fingerprint,
        },
        { withCredentials: true }
      );
      AuthStore.setAuthData(response.data);
    } catch (error) {
      throw new HttpError(error);
    }
  }

  static async registerLocal(email, username, password) {
    try {
      await http.post('/auth/register', { email, username, password });
    } catch (error) {
      throw new HttpError(error);
    }
  }

  static async registerExternal(authProvider, username, authCode) {
    try {
      await http.post(`/auth/register/${authProvider}`, {
        username,
        authCode: decodeURIComponent(authCode),
      });
    } catch (error) {
      throw new HttpError(error);
    }
  }

  static async register(formState) {
    const { authProvider } = formState;
    if (authProvider === 'local') {
      const { email, username, password } = formState;
      await this.registerLocal(email, username, password);
    } else {
      const { username, authCode } = formState;
      await this.registerExternal(authProvider, username, authCode);
    }
  }

  static async logout() {
    const authHttp = new HttpService({ withAuth: true });
    await authHttp.post('/auth/logout');
    AuthStore.resetAuthData();
  }

  static async refreshTokens() {
    try {
      const fingerprint = await getFingerprint();
      const response = await http.post(
        '/auth/refresh',
        { fingerprint },
        { withCredentials: true }
      );
      AuthStore.setAuthData(response.data);
    } catch (error) {
      AuthStore.resetAuthData();
      throw new HttpError(error);
    }
  }

  static isAccessTokenExpired() {
    const expDate = AuthStore.expiresAt - 10;
    const nowDate = Math.floor(new Date().getTime() / 1000);
    return expDate <= nowDate;
  }

  static isAuthenticated() {
    return this.isAccessTokenExpired()
      ? this.refreshTokens().then(() => AuthStore.accessToken)
      : AuthStore.accessToken && !this.isAccessTokenExpired();
  }

  static getAccessToken() {
    if (!this.isAuthenticated()) throw new AuthError();
    return AuthStore.accessToken;
  }

  static getUserId() {
    if (!this.isAuthenticated()) throw new AuthError();
    return AuthStore.userId;
  }

  static getUser() {
    if (!this.isAuthenticated()) throw new AuthError();
    return AuthStore.user;
  }
}
