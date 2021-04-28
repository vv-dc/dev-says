import { makeAutoObservable } from 'mobx';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/users.service';

class AuthStore {
  constructor() {
    AuthService.refreshTokens().catch(() => {
      this.resetAuthData();
    });
  }

  setAuthData({ accessToken }) {
    const payload = accessToken.split('.')[1];
    const tokenData = JSON.parse(atob(payload));
    const { exp: expiredAt, userId } = tokenData;
    this.accessToken = accessToken;
    this.expiredAt = expiredAt;
    this.userId = userId;
    this.setUserProfile();
  }

  resetAuthData() {
    this.accessToken = undefined;
    this.expiredAt = undefined;
    this.userId = undefined;
    this.user = undefined;
  }

  setUserProfile() {
    UserService.getById(this.userId).then(({ user }) => {
      this.user = user;
    });
  }
}

export default makeAutoObservable(new AuthStore());
