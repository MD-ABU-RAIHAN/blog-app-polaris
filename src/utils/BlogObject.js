class BlogObject {
  constructor({ title, description, imageUrl }) {
    this.id = new Date().getTime().toString();
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.likes = 0;
    this.views = 0;
    this.createdAt = new Date().toISOString();
    this.comments = [];
  }
}

export default BlogObject;
