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
  static async add({ postId, parentId, rawContent }) {
    const { userId: authorId, username, imageURL } = AuthService.user;
    const postedAt = new Date();

    const response = await http.post(
      `/posts/${postId}/comments/${parentId ?? ''}`,
      { authorId, rawContent, postedAt }
    );
    const { commentId: id } = response.data;
    const comment = {
      id,
      parentId,
      author: { username, imageURL },
      rawContent,
      postedAt,
      updatedAt: postedAt,
      replyCount: 0,
      replies: new Map(),
    };
    return comment;
  }
  static async update({ id, rawContent, updatedAt }) {
    await http.patch(`/comments/${id}`, { rawContent, updatedAt });
  }
}
