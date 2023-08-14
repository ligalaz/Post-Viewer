import Storage from "../Services/Storage.js";
import Handler from "../Services/Handler.js";

class ModalSettings {
  constructor(settings, postId, titleTarget, bodyTarget) {
    this.storage = new Storage(sessionStorage);
    this.handler = new Handler();
    this.settings = settings;
    this.postId = postId;
    this.titleTarget = titleTarget;
    this.bodyTarget = bodyTarget;
  }

  render() {
    this.settings.innerHTML = `<div class="modal__edit modal__settings_item">
                <svg
                  fill="#00FFFF"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"
                  />
                </svg>
              </div>
              <div
                class="modal__save modal__settings_item modal__settings_save-off"
              >
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.76471 4H5C4.44771 4 4 4.44772 4 5V16.5376C4 16.8309 4.12882 17.1095 4.35235 17.2995L8.42581 20.7619C8.60661 20.9156 8.83617 21 9.07346 21H19C19.5523 21 20 20.5523 20 20V5C20 4.44772 19.5523 4 19 4H16.2353M7.76471 4V9C7.76471 9.55228 8.21242 10 8.76471 10H15.2353C15.7876 10 16.2353 9.55228 16.2353 9V4M7.76471 4H16.2353"
                    stroke="#00FFFF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21"
                    stroke="#00FFFF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
               
              </div>`;
  }

  initHosts() {
    this.edit = this.settings.querySelector(`.modal__edit`);
    this.save = this.settings.querySelector(`.modal__save`);
  }

  initListeners() {
    this.titleTarget.addEventListener(`input`, (e) => {
      this.save.classList.remove(`modal__settings_save-off`);
    });
    this.bodyTarget.addEventListener(`input`, (e) => {
      this.save.classList.remove(`modal__settings_save-off`);
    });

    this.edit.addEventListener(`click`, (e) => {
      if (!e.currentTarget.classList.contains(`modal__settings_save-off`)) {
        this.targetStateToogle(false);
        e.currentTarget.classList.add(`modal__settings_save-off`);
      }
    });

    this.save.addEventListener(`click`, (e) => {
      if (!e.currentTarget.classList.contains(`modal__settings_save-off`)) {
        this.edit.classList.remove(`modal__settings_save-off`);
        this.targetStateToogle(true);
        e.currentTarget.classList.add(`modal__settings_save-off`);

        this.updatePost();
      }
    });
  }

  targetStateToogle(flag) {
    this.titleTarget.disabled = flag;
    this.bodyTarget.disabled = flag;
    this.titleTarget.classList.toggle(`content_editMode`);
    this.bodyTarget.classList.toggle(`content_editMode`);
  }

  updatePost() {
    const title = this.titleTarget.value;
    const body = this.bodyTarget.value;
    this.handler.updateContainers(this.postId, { title, body });
  }

  initialize() {
    this.render();
    this.initHosts();
    this.initListeners();
  }
}

export default ModalSettings;
