import AuthStore from '../stores/auth-store';
import { HttpService } from './http.service';
import { getFingerprint } from '../helpers/get-fingerprint';

const http = new HttpService({ withAuth: false });

export class AuthService {
  static async login(login, password) {
    const fingerprint = await getFingerprint();
    const response = await http.post(
      '/auth/login',
      { login, password, fingerprint },
      { withCredentials: true }
    );
    AuthStore.setAuthData(response.data);
  }

  static async register(email, username, password) {
    await http.post('/auth/register', { email, username, password });
  }

  static async logout() {
    await new HttpService({ withAuth: true }).post(
      '/auth/logout',
      {},
      { withCredentials: true }
    );
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
      return error;
    }
  }

  static async registerExternal(service, username, authCode) {
    await http.post(`/auth/register/${service}`, { username, authCode });
  }

  static async loginExternal(service, authCode) {
    const fingerprint = await getFingerprint();
    const response = await http.post(
      `auth/login/${service}`,
      { authCode, fingerprint },
      { withCredentials: true }
    );
    AuthStore.setAuthData(response.data);
  }

  static isAccessTokenExpired() {
    const expDate = AuthStore.expiredAt - 10;
    const nowDate = Math.floor(new Date().getTime() / 1000);
    return expDate <= nowDate;
  }

  static isAuthenticated() {
    return Boolean(AuthStore.accessToken);
  }

  static getAccessToken() {
    return AuthStore.accessToken;
  }
}
