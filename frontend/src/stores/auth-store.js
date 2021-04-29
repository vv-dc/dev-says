import { makeAutoObservable } from 'mobx';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/users.service';
import { parseToken } from '../helpers/parse-token';

class AuthStore {
  constructor() {
    AuthService.refreshTokens().catch(() => {
      this.resetAuthData();
    });
  }

  setAuthData({ accessToken }) {
    const { exp: expiresAt, userId } = parseToken(accessToken);
    Object.assign(this, { accessToken, expiresAt, userId });
    this.setUserProfile();
  }

  resetAuthData() {
    this.accessToken = this.expiresAt = this.userId = undefined;
    this.user = null;
  }

  setUserProfile() {
    UserService.getById(this.userId).then(({ user }) => {
      this.user = user;
    });
  }
}

export default makeAutoObservable(new AuthStore());
