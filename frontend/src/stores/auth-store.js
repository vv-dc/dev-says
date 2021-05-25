import { makeAutoObservable, runInAction } from 'mobx';

import { UserService } from '../services/users.service';
import { parseToken } from '../helpers/parse-token';

class AuthStore {
  constructor() {
    this.resetAuthData();
    makeAutoObservable(this);
  }

  async setAuthData({ accessToken }) {
    const { exp: expiresAt, userId } = parseToken(accessToken);
    const { user } = await UserService.getById(userId);
    runInAction(() =>
      Object.assign(this, { user, accessToken, expiresAt, userId })
    );
  }

  resetAuthData() {
    this.accessToken = this.expiresAt = this.userId = undefined;
    this.user = null;
  }
}

export default new AuthStore();
