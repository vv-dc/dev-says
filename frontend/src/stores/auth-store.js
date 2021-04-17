import { makeAutoObservable } from 'mobx';
import { AuthService } from '../services/auth.service';

class AuthStore {
  constructor() {
    AuthService.refreshTokens().catch(() => {
      this.resetAuthData();
    });
  }

  setAuthData({ accessToken }) {
    const payload = accessToken.split('.')[1];
    const tokenData = JSON.parse(atob(payload));
    this.accessToken = accessToken;
    this.expiredAt = tokenData.exp;
  }

  resetAuthData() {
    this.accessToken = undefined;
    this.expiredAt = undefined;
  }
}

export default makeAutoObservable(new AuthStore());
