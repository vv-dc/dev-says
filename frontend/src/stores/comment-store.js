import { makeAutoObservable, runInAction } from 'mobx';
import { CommentService } from '../services/comment.service';

export class CommentStore {
  comments = [];
  postId = undefined;

  constructor(postId) {
    this.postId = postId;
    makeAutoObservable(this);
  }

  getCommentById(commentId) {
    const comment = this.comments.filter(comment => {
      return comment.id === commentId;
    });
    return comment[0];
  }

  async fetchComments(parentId) {
    const data = await CommentService.getByParent({
      postId: this.postId,
      parentId,
    });
    const comments = data.map(comment => {
      return Object.assign(comment, { children: [] });
    });
    const parent = this.getCommentById(parentId);
    runInAction(() => {
      if (parent) {
        parent.children.push(...comments);
      }
      this.comments.push(...comments);
    });
  }

  async addComment(parentId, rawContent) {
    const comment = await CommentService.addComment({
      postId: this.postId,
      parentId,
      rawContent,
    });
    const parent = this.getCommentById(parentId);
    runInAction(() => {
      if (parent) {
        parent.children.push(comment);
        parent.replies += 1;
      }
      this.comments.push(comment);
    });
  }

  getReplies(parentId) {
    const replies = this.comments.filter(comment => {
      return comment.parentId === parentId;
    });
    return replies;
  }
}
