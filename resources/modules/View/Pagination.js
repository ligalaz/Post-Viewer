import Handler from "../Services/Handler.js";
import Provider from "../Services/Provider.js";
import Loader from "../Loader.js";
import Storage from "../Services/Storage.js";
import postTemplate from "./Templates/post.js";

class Pagination {
  constructor(pagination, postRow, ...elems) {
    this.pagination = pagination;
    this.postRow = postRow;
    this.onHideElements = [this.pagination, ...elems];

    this.handler = new Handler();
    this.provider = new Provider();
    this.loader = new Loader(this.postRow);
    this.storage = new Storage(sessionStorage);

    this.limit = Number(this.storage.getItem(this.storage.keys.limit));
    this.total = Number(this.storage.getItem(this.storage.keys.total));
    this.border = Math.ceil(this.total / this.limit);
    this.count = 1;

    this.buttonBlocked = `pagination_blocked`;
    this.buttonActive = `pagination_active`;
    this.onHide = `unvisible`;
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
    this.turnRight = this.pagination.querySelector(`.pagination_right`);
    this.turnLeft = this.pagination.querySelector(`.pagination_left`);
  }

  initProviders() {
    this.counter = this.pagination.querySelector(`.pagination_current`);
  }

  initListeners() {
    this.turnRight.addEventListener(`click`, async (e) => {
      const nextSkip = this.count + (this.limit - 1) * this.count;
      if (this.count === 1) {
        this.drawPost(nextSkip);
        this.changeCounter(true);
        this.blockedHost(e, false);
      } else if (this.count < this.border - 1 && this.count > 1) {
        this.drawPost(nextSkip);
        this.changeCounter(true);
      } else if (this.count == this.border - 1 && this.count > 1) {
        this.drawPost(nextSkip);
        this.changeCounter(true);
        this.blockedHost(e, true);
      } else {
        return;
      }
    });

    this.turnLeft.addEventListener(`click`, async (e) => {
      const prevSkip = (this.count - 1) * this.limit - this.limit;
      if (this.count > 1 && this.count < this.border) {
        this.drawPost(prevSkip);
        this.changeCounter(false);
      }
      if (this.count == 1) {
        this.blockedHost(e, true);
        return;
      }
      if (this.count == 5) {
        this.drawPost(prevSkip);
        this.changeCounter(false);
        this.blockedHost(e, false);
      }
    });
  }

  async drawPost(skip) {
    let newPostList = await this.beforeLoading(skip);
    this.postRow.innerHTML = postTemplate(newPostList);
  }

  async beforeLoading(skip) {
    let postList = ``;

    if (!postList) {
      this.hideElements(true, this.onHideElements);
      this.loader.initialize();
    }

    postList = await this.handler.fillPostsContainer(skip);
    this.hideElements(false, this.onHideElements);

    return postList;
  }

  blockedHost(e, flag) {
    if (flag) {
      e.currentTarget.classList.add(this.buttonBlocked);
      e.currentTarget.classList.remove(this.buttonActive);
    }

    switch (e.currentTarget) {
      case this.turnRight:
        if (!flag) {
          this.turnLeft.classList.remove(this.buttonBlocked);
          this.turnLeft.classList.add(this.buttonActive);
        }
        break;
      case this.turnLeft:
        if (!flag) {
          this.turnRight.classList.remove(this.buttonBlocked);
          this.turnRight.classList.add(this.buttonActive);
        }
        break;
      default:
        break;
    }
  }

  changeCounter(flag) {
    !flag ? this.count-- : this.count++;
    this.counter.textContent = `${this.count}`;
  }

  hideElements(flag, elements) {
    flag
      ? elements.forEach((item) => item.classList.add(this.onHide))
      : elements.forEach((item) => item.classList.remove(this.onHide));
  }

  initialize() {
    this.render();
    this.initProviders();
    this.initHosts();
    this.initListeners();
  }
}

export default Pagination;
