import { AuthService } from './auth.service';
import { HttpService } from './http.service';

const http = new HttpService({ withAuth: false }); // true for production

export class CommentService {
  static async getByParent({ postId, parentId }) {
    const response = await http.get(
      `/posts/${postId}/comments/${parentId ?? ''}`,
      { withCredentials: true }
    );
    return response.data.comments;
  }
  static async addComment({ postId, parentId, rawContent }) {
    const { userId: authorId, username, imageURL } = AuthService.user;
    const response = await http.post(
      `/posts/${postId}/comments/${parentId ?? ''}`,
      { authorId, rawContent }
    );
    const { commentId: id, postedAt } = response.data.comment;
    const comment = {
      id,
      parentId,
      author: { username, imageURL },
      rawContent,
      postedAt,
      updatedAt: postedAt,
      replies: 0,
      children: [],
    };
    return comment;
  }
}
