import Provider from "./Provider.js";
import Storage from "./Storage.js";
import Const from "../../consts/const.js";

class Handler {
  constructor() {
    this.provider = new Provider();
    this.storage = new Storage(sessionStorage);
    this.postContainer = [];
    this.fullPostContainer = [];
    this.commentsContainer = [];
  }

  async fillPostsContainer(skip = 0) {
    const data = await this.provider.getAllPosts(Const.selectPost, skip);
    const { limit, total } = data;

    this.storage.setItem(this.storage.keys.limit, limit);
    this.storage.setItem(this.storage.keys.total, total);
    this.postContainer = [];

    data.posts.forEach((item) => this.postContainer.push(this.editPost(item)));
    this.storage.setItem(this.storage.keys.postContainer, this.postContainer);

    return this.postContainer;
  }

  async fillFullPostContainer(postId, mode) {
    let data = await this.provider.getPost(postId);

    const { id, title, body, tags, reactions, userId } = data;

    data = await this.provider.getUser(userId);

    const { firstName, lastName, maidenName, company } = data;
    const fullModel = {
      id,
      title,
      body,
      tags,
      reactions,
      userId,
      firstName,
      lastName,
      maidenName,
      company,
    };

    if (this.storage.getItem(this.storage.keys.fullPostContainer)) {
      const posts = this.storage.getItem(this.storage.keys.fullPostContainer);
      posts.findIndex((item) => item.id == id) === -1
        ? posts.push(fullModel)
        : null;
      posts.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.storage.setItem(this.storage.keys.fullPostContainer, posts);
    } else {
      this.storage.setItem(this.storage.keys.fullPostContainer, [fullModel]);
    }

    this.fullPostContainer = [];

    this.fullPostContainer.push(fullModel);

    return this.fullPostContainer;
  }

  async fillCommentsContainer(postId) {
    const data = await this.provider.getComments(postId);
    const { comments } = data;
    // this.commentsContainer = [];

    this.commentsContainer = comments.map((item) => {
      return {
        body: item.body,
        username: item.user.username,
      };
    });
    return this.commentsContainer;
  }

  editPost(post) {
    const { id, title, body, reactions, userId } = post;
    const editBody = this.filteredPostBody(body);

    return { id, title, body, editBody, reactions, userId };
  }

  filteredPostBody(body) {
    return body.length > 100 ? `${body.slice(0, 100)}...` : body;
  }
}
export default Handler;
