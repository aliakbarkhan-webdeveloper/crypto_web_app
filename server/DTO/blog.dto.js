class BlogDTO {
  constructor(data) {
    this.author = data.author;
    this.content = data.content;
    this.photo = data.photoPath;
    this.title = data.title;
  }
}

module.exports = BlogDTO;
