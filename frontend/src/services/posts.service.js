import { HttpService } from './http.service';

const http = new HttpService({ auth: false }); // change it later

export class PostService {
  static async getByUserId(userId) {
    const response = await http.get(`/posts?userId=${userId}`, {
      withCredentials: true,
    });
    return response.data.posts;
  }
}
