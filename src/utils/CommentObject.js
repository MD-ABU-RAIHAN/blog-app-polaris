class CommentObject {
  constructor({ commenterName, comment }) {
    this.id = new Date().getTime().toString();
    this.commenterName = commenterName;
    this.comment = comment;
    this.createdAt = new Date().toISOString();
  }
}

export default CommentObject;
