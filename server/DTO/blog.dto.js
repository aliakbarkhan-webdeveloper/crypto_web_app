class BlogDTO {
  constructor(data) {
    this._id=blog._id
    this.author = data.author;
    this.content = data.content;
    this.photo = data.photoPath;
    this.title = data.title;
  }
}

module.exports = BlogDTO;
