import { HttpService } from './http.service';

const http = new HttpService({ withAuth: false }); // true for production

export class CommentService {
  static async getByParent(postId, parentId) {
    const response = await http.get(
      `/posts/${postId}/comments/${parentId ?? ''}`,
      { withCredentials: true }
    );
    return response.data.comments;
  }
}
