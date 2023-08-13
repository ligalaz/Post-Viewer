import Footer from "./View/Other/Footer.js";
import Header from "./View/Other/Header.js";
import Pagination from "./View/Pagination.js";
import postTemplate from "./View/Templates/post.js";

class View {
  constructor(view, container) {
    this.view = view;
    this.postContainer = container;
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

    this.initModules();
  }

  initHosts() {}
  initModules() {
    const footer = this.view.querySelector(`.footer`);
    const header = this.view.querySelector(`.header`);
    const pagination = this.view.querySelector(`.pagination`);
    this.footer = new Footer(footer);
    this.footer.initialize();
    this.header = new Header(header);
    this.header.initialize();
    this.postRow = this.view.querySelector(`.main__post-row`);
    this.pagination = new Pagination(pagination, this.postRow, footer, header);
    this.pagination.initialize();
  }
  initListeners() {}
  initialize() {
    this.render();
    this.initHosts();
  }
}

export default View;
