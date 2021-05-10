import { HttpService } from './http.service';

const http = new HttpService({ auth: false });

export class UserService {
  static get entity() {
    return 'users';
  }

  static async getById(userId) {
    const apiUrl = `/${this.entity}/${userId}`;
    const response = await http.get(apiUrl);
    return response.data;
  }

  static async getByUsername(username) {
    const apiUrl = `/${this.entity}?username=${username}`;
    const response = await http.get(apiUrl);
    return response.data;
  }

  static async getStats(userId) {
    const apiUrl = `/${this.entity}/${userId}/stats`;
    const response = await http.get(apiUrl);
    return response.data;
  }
}
