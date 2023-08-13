import Handler from "../Handler.js";
import Provider from "../Provider.js";
import Loader from "../Loader.js";

class Pagination {
  constructor(pagination, postRow) {
    this.pagination = pagination;
    this.postRow = postRow;
    this.count = 1;
    this.border = 0;
    this.handler = new Handler();
    this.provider = new Provider();
    this.loader = new Loader(this.postRow);
  }

  render() {
    this.pagination.innerHTML = `<div class="pagination__item pagination_left pagination_blocked">
            <p><</p>
          </div>
          <div class="pagination__item pagination_current"><p>1</p></div>
          <div class="pagination__item pagination_right pagination_active">
            <p>></p>
          </div>`;
  }
  initHosts() {
    this.counter = this.pagination.querySelector(`.pagination_current`);
    this.turnRight = this.pagination.querySelector(`.pagination_right`);
    this.turnLeft = this.pagination.querySelector(`.pagination_left`);
  }
  initListeners() {
    this.turnRight.addEventListener(`click`, async () => {
      if (!this.border) {
        const { total, limit } = await this.provider.getAllPosts();
        this.border = total / limit;
      }

      if (this.count < this.border) {
        this.count++;
        this.counter.textContent = `${this.count}`;
        this.nextPost(this.count);
        this.turnLeft.classList.remove(`pagination_blocked`);
        this.turnLeft.classList.add(`pagination_active`);
      }
      if (this.count === this.border) {
        this.turnRight.classList.add(`pagination_blocked`);
      }
    });
  }

  async nextPost(skip) {
    let postList = ``;
    if (!postList) {
      this.loader.initialize();
    }
    postList = await this.handler.fillPostsContainer(skip);
    this.postRow.innerHTML = `${postList.map(
      (
        item,
        idx,
      ) => `<div id=${item.id} userId=${item.userId} class="post main__post">
            <div class="title__container">
              <p class="title post__title">${item.title}</p>
            </div>
            <p class="text post__text">${item.editBody}

            </p>
            <div class="info post_info">
              <div class="spectators post__spectators">
                <div class="spectators__logo">
                  <img
                    src="./resources/icons/settings/monitor.png"
                    alt="spectators"
                  />
                </div>
                <div class="spectators__number">${item.reactions}</div>
              </div>
              <div class="author post__author">userId№  ${item.userId}</div>
            </div>
          </div>`,
    ).join``}`;
  }

  initialize() {
    this.render();
    this.initHosts();
    this.initListeners();
  }
}

export default Pagination;
