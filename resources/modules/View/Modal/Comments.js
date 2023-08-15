class Comments {
  constructor(comment, comments) {
    this.comment = comment;
    this.comments = comments;
  }

  render() {
    this.comment.innerHTML = `${this.comments.map(
      (item) => `<div class="comments__item">
                  <div class="comments__text">${item.body}</div>
                  <div class="comments__author">${item.username}</div>
                </div>`,
    ).join``}`;
  }

  initialize() {
    this.render();
  }
}

export default Comments;
