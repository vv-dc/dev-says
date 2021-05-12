import { makeAutoObservable, runInAction } from 'mobx';
import { CommentService } from '../services/comment.service';

export class CommentStore {
  index = new Map();
  tree = new Map();
  postId = undefined;

  constructor(postId) {
    this.postId = postId;
    makeAutoObservable(this);
  }

  getComment(commentId) {
    if (commentId === null) return null;
    const path = [commentId];

    let parentId = this.index.get(commentId);
    while (parentId !== null) {
      path.push(parentId);
      parentId = this.index.get(parentId);
    }
    let children = this.tree,
      comment = null;
    for (const id of path.reverse()) {
      comment = children.get(id);
      children = comment.replies;
    }
    return comment;
  }

  getReplies(parent) {
    return parent ? parent.replies : this.tree;
  }

  async fetchComments(parentId) {
    const comments = await CommentService.getByParent({
      postId: this.postId,
      parentId,
    });
    const parent = this.getComment(parentId);
    const children = this.getReplies(parent);

    runInAction(() => {
      for (const comment of comments) {
        const { id, parentId } = comment;
        const replies = new Map();

        children.set(id, { ...comment, replies });
        this.index.set(id, parentId);
      }
    });
  }

  async addComment(parentId, rawContent) {
    const comment = await CommentService.add({
      postId: this.postId,
      parentId,
      rawContent,
    });
    const parent = this.getComment(parentId);

    runInAction(() => {
      this.index.set(comment.id, parentId);
      if (parent) parent.replyCount += 1;

      const children = this.getReplies(parent);
      children.set(comment.id, comment);
    });
  }

  async updateComment(id, rawContent) {
    const updatedAt = new Date();
    await CommentService.update({ id, rawContent, updatedAt });

    const comment = this.getComment(id);
    runInAction(() => {
      comment.updatedAt = updatedAt;
      comment.rawContent = rawContent;
    });
  }
}
