import AuthStore from '../stores/auth-store';
import { HttpService } from './http.service';
import { getFingerprint } from '../helpers/get-fingerprint';

const http = new HttpService({ withAuth: false });

export class AuthService {
  static async loginLocal(login, password) {
    const fingerprint = await getFingerprint();
    const response = await http.post(
      '/auth/login',
      { login, password, fingerprint },
      { withCredentials: true }
    );
    AuthStore.setAuthData(response.data);
  }

  static async loginExternal(authProvider, authCode) {
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
  }

  static async registerLocal(email, username, password) {
    await http.post('/auth/register', { email, username, password });
  }

  static async registerExternal(authProvider, username, authCode) {
    console.log({ authProvider, username, authCode });
    await http.post(`/auth/register/${authProvider}`, {
      username,
      authCode: decodeURIComponent(authCode),
    });
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
