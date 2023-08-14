import Handler from "../Services/Handler.js";
import Modal from "./Modal.js";
import Footer from "./Other/Footer.js";
import Header from "./Other/Header.js";
import Pagination from "./Pagination.js";
import postTemplate from "./Templates/post.js";
import Storage from "../Services/Storage.js";

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
      </header>
      <main class="main app__main">
        <div class="main__post-row">${postTemplate(this.postContainer)}
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
      this.showModal(target.id);
    });
  }

  allModulesInitialize() {
    const footer = this.view.querySelector(`.footer`);
    const header = this.view.querySelector(`.header`);
    const pagination = this.view.querySelector(`.pagination`);
    const postRow = this.view.querySelector(`.main__post-row`);

    this.initModule(Footer, footer);
    this.initModule(Header, header);
    this.initModule(Pagination, pagination, postRow, footer, header);
  }

  async showModal(postId) {
    const post = await this.handler.fillFullPostContainer(postId);
    this.modal.classList.add(`modal_show`);
    this.modalWindow = new Modal(this.modal, post[0]);
    this.modalWindow.initialize();
  }

  initialize() {
    this.render();
    this.initHosts();
    this.initProviders();
    this.initListeners();
  }
}

export default View;
