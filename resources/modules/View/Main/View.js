import Handler from "../../Services/Handler.js";
import Modal from "../Modal/Modal.js";
import Footer from "../Other/Footer.js";

import Pagination from "./Pagination.js";
import postTemplate from "../Templates/post.js";
import Storage from "../../Services/Storage.js";
import Search from "./Search.js";

class View {
  constructor(view, container) {
    this.view = view;
    this.postContainer = container;
    this.handler = new Handler();
    this.storage = new Storage(sessionStorage);
  }

  render() {
    this.view.innerHTML = `<div class="container app__container">
      <header class="header app__header">
      <div class="logo header__logo">
          <div class="logo__border"></div>
          <div class="emblem logo__body">
            <p class="logo_big-letter">
              P<span class="logo_small-letter logo_vertical">ost</span>
            </p>
            <p class="logo_big-letter">
              V<span class="logo_small-letter">iewer</span>
            </p>
          </div>
        </div>
        <div class="search header__search"></div>
      </header>
      <main class="main app__main">
        <div class="post-row main__post-row">${postTemplate(this.postContainer)}
        </div>

        <div class="pagination main__pagination">
        </div>
       
        <div class="modal app__modal">
        </div>
      </main>
      <footer class="footer app__footer">
      </footer>
    </div>`;

    this.allModulesInitialize();
  }

  initHosts() {
    this.posts = this.view.querySelector(`.main__post-row`);
  }

  initModule(Module, host, ...modules) {
    const module = new Module(host, ...modules);
    module.initialize();
  }

  initProviders() {
    this.modal = this.view.querySelector(`.modal`);
  }

  initListeners() {
    this.posts.addEventListener(`click`, (e) => {
      const target = e.target.closest(`.post`);
      if (!target) {
        return;
      }
      this.drawModal(target.id);
    });
  }

  allModulesInitialize() {
    const footer = this.view.querySelector(`.footer`);
    const header = this.view.querySelector(`.header`);
    const pagination = this.view.querySelector(`.pagination`);
    const search = this.view.querySelector(`.search`);
    const postRow = this.view.querySelector(`.main__post-row`);

    this.initModule(Footer, footer);
    this.initModule(Pagination, pagination, postRow, footer, header);
    this.initModule(Search, search, postRow);
  }

  async drawModal(postId) {
    let currentFullPosts =
      this.storage.getItem(this.storage.keys.fullPostContainer) || [];

    currentFullPosts = currentFullPosts
      .map((item) => (item.id == postId ? item : ``))
      .filter((item) => item !== ``);

    this.truePostBeforepagination(currentFullPosts);

    const post = currentFullPosts.length
      ? currentFullPosts
      : await this.handler.fillFullPostContainer(postId);

    this.modal.classList.add(`modal_show`);
    this.modalWindow = new Modal(this.modal, post[post.length - 1], this.posts);
    this.modalWindow.initialize();
  }

  truePostBeforepagination(currentFullPosts) {
    if (currentFullPosts.length) {
      const currentId = currentFullPosts[0].id;
      const currentShortPostContainer = this.storage.getItem(
        this.storage.keys.postContainer,
      );
      const currIdx = currentShortPostContainer.findIndex(
        (item) => item.id == currentId,
      );

      const title = currentShortPostContainer[currIdx].title;
      const body = currentShortPostContainer[currIdx].body;
      currentFullPosts[0].title = title;
      currentFullPosts[0].body = body;
      const currentFullPostContainer = this.storage.getItem(
        this.storage.keys.fullPostContainer,
      );
      this.storage.setItem(
        this.storage.keys.fullPostContainer,
        currentFullPostContainer.map((item) => {
          if (item.id == currentId) {
            item.title = title;
            item.body = body;
          }
          return item;
        }),
      );
    }
  }

  initialize() {
    this.render();
    this.initHosts();
    this.initProviders();
    this.initListeners();
  }
}

export default View;
