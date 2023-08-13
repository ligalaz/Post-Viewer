import Const from "../consts/const.js";

class Provider {
  constructor(src = "") {
    this.src = src.length ? src : Const.defaultSrc;
  }

  async getPost(postId, select = ``, skip = ``) {
    return await this.sendRequest(
      `${this.createSrc(Const.routes.posts, postId, select, skip)}`,
    );
  }
  async getUser(userId, select = ``, skip = ``) {
    return await this.sendRequest(
      `${this.createSrc(Const.routes.users, userId, select, skip)}`,
    );
  }
  async getComments(postId) {
    return await this.sendRequest(
      `${this.createSrc(Const.routes.posts, postId, select, skip)}/${
        Const.routes.comments
      }`,
    );
  }

  async getAllPosts(select = ``, skip = ``) {
    return await this.sendRequest(
      this.createSrc(Const.routes.posts, ``, select, skip),
    );
  }

  async editPost(postId, options) {
    return this.sendRequest(`${this.src}/${postId}`, options);
  }

  async sendRequest(src, options = ``) {
    let response;
    let data;

    if (!options) {
      response = await fetch(src);
      data = await response.json();
    } else {
      response = await fetch(this.src, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: options,
      });
      data = await response.json();
    }

    return data;
  }

  searchQuery(select, skip) {
    return select && skip
      ? `?select=${select}&skip=${skip}`
      : !select && skip
      ? `?skip=${skip}`
      : select && !skip
      ? `?select=${select}`
      : ``;
  }

  createSrc(route, id, select, skip) {
    switch (route) {
      case Const.routes.users:
        return `${this.src}${Const.routes.users}/${id}${this.searchQuery(
          select,
          skip,
        )}`;

      case Const.routes.posts:
        return `${this.src}${Const.routes.posts}/${id}${this.searchQuery(
          select,
          skip,
        )}`;

      default:
        return `${this.src}${Const.routes.posts}${this.searchQuery(
          select,
          skip,
        )}`;
    }
  }
}

export default Provider;
