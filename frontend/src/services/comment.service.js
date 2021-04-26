import { HttpService } from './http.service';
const { REACT_APP_API_HOST: API_HOST } = process.env;

const http = new HttpService({ withAuth: false }); // true for production

export class CommentService {
  static async getByParent(postId, parentId) {
    const comments = await http.get(
      `${API_HOST}/posts/${postId}/comments/${parentId ?? ''}`,
      { withCredentials: true }
    );
    return comments.data.comments;
  }
}
