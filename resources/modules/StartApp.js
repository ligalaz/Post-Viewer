import Storage from "./Services/Storage.js";
import Handler from "./Services/Handler.js";
import Loader from "./View/Other/Loader.js";
import View from "./View/Main/View.js";

class StartApp {
  constructor(app) {
    this.app = app;
    this.handler = new Handler();
    this.loader = new Loader(this.app);
    this.storage = new Storage(sessionStorage);
  }

  render() {
    this.app.innerHTML = `<div class="container app__container app__container_center">
                            <div class="start-btn main__start">
                             <p class="start-btn__text">View Posts</p>
                            </div>
                        </div>`;
  }

  initHosts() {
    this.startBtn = this.app.querySelector(".start-btn");
  }

  initListeners() {
    this.startBtn.addEventListener(`click`, async () => {
      let loadingData = ``;

      if (!loadingData) {
        this.loader.initialize();
      }
      loadingData = this.storage.getItem(this.storage.keys.postContainer)
        ? this.storage.getItem(this.storage.keys.postContainer)
        : await this.handler.fillPostsContainer();

      this.view = new View(this.app, loadingData);
      this.view.initialize();
    });
  }

  initialize() {
    this.render();
    this.initHosts();
    this.initListeners();
  }
}

export default StartApp;
