import { AuthError } from '../helpers/auth-error';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

const http = new HttpService({ withAuth: false });
const authHttp = new HttpService({ withAuth: true });

export class PostService {
  static get entity() {
    return 'posts';
  }

  static async getByUserId(userId) {
    const apiUrl = `/${this.entity}?userId=${userId}`;
    const response = await http.get(apiUrl);
    return response.data;
  }

  static async getUserScore(postId) {
    try {
      const userId = AuthService.userId;
      const apiUrl = `/${this.entity}/${postId}/scores/${userId}`;
      const response = await authHttp.get(apiUrl);
      return response.data;
    } catch (error) {
      return error instanceof AuthError ? { score: 0 } : error;
    }
  }

  static async updateUserScore(postId, score) {
    const userId = AuthService.userId;
    const apiUrl = `/${this.entity}/${postId}/scores/${userId}`;
    await authHttp.put(apiUrl, { score });
  }
}
