import Provider from "./Provider.js";
import Storage from "./Storage.js";
import Const from "../consts/const.js";

class Handler {
  constructor() {
    this.provider = new Provider();
    this.storage = new Storage();
    this.postContainer = [];
    this.fullPostContainer = [];
  }

  async fillPostsContainer(skip = 0) {
    const data = await this.provider.getAllPosts(Const.selectPost, skip);
    data.posts.forEach((item) => this.postContainer.push(this.editPost(item)));

    console.log(`post:`, this.postContainer);
    return this.postContainer;
  }

  async fillFullPostContainer(postId) {
    let data = await this.provider.getPost(postId);

    const { id, title, body, tags, reactions, userId } = data;

    data = await this.provider.getUser(userId);

    const { firstName, lastName, maidenName, company } = data;

    this.fullPostContainer.push({
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
    });

    return this.fullPostContainer;
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
