import axios from 'axios';
import { AuthService } from './auth.service';

const { REACT_APP_API_HOST } = process.env;

export class HttpService {
  constructor({ withAuth } = false) {
    this.instance = axios.create({ baseURL: REACT_APP_API_HOST });
    if (withAuth) {
      this.instance.interceptors.request.use(request => {
        if (AuthService.isAccessTokenExpired()) {
          AuthService.refreshTokens().catch(err => Promise.reject(err));
        }
        request.headers.authorization = AuthService.getAccessToken();
        return request;
      });
    }
    return this.instance;
  }
}
