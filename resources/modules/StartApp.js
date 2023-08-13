import Handler from "./Handler.js";
import Loader from "./Loader.js";
import View from "./View.js";

class StartApp {
  constructor(app) {
    this.app = app;
    this.handler = new Handler();
    this.loader = new Loader(this.app);
  }

  render() {
    this.app.innerHTML = `<div class="container app__container">
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
      let test = ``;
      if (!test) {
        this.loader.initialize();
      }

      test = await this.handler.fillPostsContainer();
      console.log(test);
      this.view = new View(this.app, test);
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
