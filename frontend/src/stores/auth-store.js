import { makeAutoObservable } from 'mobx';

import { AuthService } from '../services/auth.service';
import { parseToken } from '../helpers/parse-token';
class AuthStore {
  constructor() {
    AuthService.refreshTokens().catch(() => {
      this.resetAuthData();
    });
  }

  setAuthData({ accessToken }) {
    const { exp: expiredAt } = parseToken(accessToken);
    Object.assign({ accessToken, expiredAt });
  }

  resetAuthData() {
    this.accessToken = undefined;
    this.expiredAt = undefined;
  }
}

export default makeAutoObservable(new AuthStore());
