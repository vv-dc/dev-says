import { HttpService } from './http.service';

const http = new HttpService({ auth: false }); // change it later

export class UserService {
  static async getByUsername(username) {
    const response = await http.get(`/users?username=${username}`, {
      withCredentials: true,
    });
    return response.data.user;
  }
}
