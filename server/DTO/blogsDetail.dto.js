class BlogUserDTO {
    constructor(data) {
      this._id=blog._id
     this.createdAt=data.createdAt;
      this.content = data.content;
      this.photo = data.photoPath;
      this.title = data.title;
      this.authorName=data.author.name;
      this.authorUsername=data.authorUsername;
    }
  }
  
  module.exports = BlogUserDTO;