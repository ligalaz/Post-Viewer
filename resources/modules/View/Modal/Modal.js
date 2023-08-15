import Handler from "../../Services/Handler.js";
import Comments from "./Comments.js";
import Storage from "../../Services/Storage.js";
import Loader from "../Other/Loader.js";
import ModalSettings from "./ModalSettings.js";
import postTemplate from "../Templates/post.js";

class Modal {
  constructor(modal, fullPostModel, targetView) {
    this.modal = modal;
    this.fullPostModel = fullPostModel;

    this.targetView = targetView;
    this.handler = new Handler();
    this.storage = new Storage(sessionStorage);
    this.loader = new Loader(this.modal);
    this.isLoading = true;
  }

  render() {
    this.modal.innerHTML = `<div class="modal__body">
            <div class="close modal__close">
              <svg class="close__item"
                fill="#00FFFF"
                width="25px"
                height="25px"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.484 0c-.13.004-.252.057-.343.15L17.164 12.13c-.49.47.235 1.197.706.707L29.846.857c.325-.318.1-.857-.363-.857zM12.488 17c-.13.004-.25.058-.34.15L.162 29.14c-.486.467.233 1.186.7.7L12.848 17.85c.325-.313.093-.85-.36-.85zM.5 0a.5.5 0 0 0-.348.86L29.14 29.845a.5.5 0 1 0 .706-.706L.86.152A.5.5 0 0 0 .5 0z"
                />
              </svg>
            </div>
            <div class="modal__settings">
              
            </div>
            <div class="modal__title">
              <input
                type="text"
                class="modal__title_text"
                value="${this.fullPostModel.title}"
                maxlength="50"
                disabled
              />
            </div>
            <div class="author modal__author">
              <div class="author__name">${this.fullPostModel.firstName} "${
      this.fullPostModel.maidenName
    }" ${this.fullPostModel.lastName}</div>
              <div class="author__job">${this.fullPostModel.company.title}</div>
              <div class="author__bureau">${
                this.fullPostModel.company.department
              }</div>
              <hr />
            </div>

            <div class="content modal__content">
              <p class="content__annotation">writes:</p>
              <textarea
                class="content__text"
                name=""
                id="#${this.fullPostModel.company.postId}"
                cols="1"
                rows="6"
                wrap="soft"
                style="resize: none"
                disabled
              >
             ${this.fullPostModel.body}
               </textarea>

              <p class="content__tags">#${this.fullPostModel.tags
                .map((item) => item)
                .join(` #`)}</p>
              <hr />
            </div>

            <div class="comments modal__comments" >
              <div class="comments__show" postId="${
                this.fullPostModel.id
              }">Show comments</div>
              <div class="comments__row">
      
              </div>
              <hr />
            </div>
            <div class="slider modal__slider">
              <div class="slider__item modal__slider_left">previous post</div>
              <div class="slider__item modal__slider_right">next post</div>
            </div>
          </div>`;

    this.allModulesInitialize();
  }

  initHosts() {
    this.showComments = this.modal.querySelector(`.comments__show`);
    this.commentsRow = this.modal.querySelector(`.comments__row`);
    this.closeBtn = this.modal.querySelector(`.close`);
    this.sliderRight = this.modal.querySelector(`.modal__slider_right`);
    this.sliderLeft = this.modal.querySelector(`.modal__slider_left`);
  }

  initListeners() {
    this.showComments.addEventListener(`click`, async (e) => {
      const postId = e.currentTarget.getAttribute(`postId`);
      if (!this.commentsRow.classList.contains(`comments_visible`)) {
        const comments = await this.handler.fillCommentsContainer(postId);
        this.drawComments(comments);
      } else {
        this.hideComments();
      }
    });

    this.closeBtn.addEventListener(`click`, (e) => {
      this.hideModal(e);
      this.targetView.innerHTML = postTemplate(
        this.storage.getItem(this.storage.keys.postContainer),
      );
    });

    this.sliderRight.addEventListener(`click`, () => {
      this.changePost(true);
    });
    this.sliderLeft.addEventListener(`click`, () => {
      this.changePost(false);
    });
  }

  initModule(Module, host, ...modules) {
    const module = new Module(host, ...modules);
    module.initialize();
  }

  allModulesInitialize() {
    const settings = this.modal.querySelector(`.modal__settings`);
    const titleTarget = this.modal.querySelector(`.modal__title_text`);
    const bodyTarget = this.modal.querySelector(`.content__text`);

    this.initModule(
      ModalSettings,
      settings,
      this.fullPostModel.id,
      titleTarget,
      bodyTarget,
      this.modal.querySelector(`.modal__slider_right`),
      this.modal.querySelector(`.modal__slider_left`),
    );
  }

  drawComments(comments) {
    this.comments = new Comments(this.commentsRow, comments);
    this.comments.initialize();
    this.commentsRow.classList.add(`comments_visible`);
  }

  hideComments() {
    const comments = Array.from(this.commentsRow.children);
    if (this.commentsRow.classList.contains(`comments_visible`)) {
      comments.forEach((comment) => comment.classList.add(`comment_hide`));
      this.commentsRow.classList.remove(`comments_visible`);
    }
  }

  hideModal(e) {
    if (this.isLoading) {
      e.currentTarget === this.closeBtn
        ? this.modal.classList.remove(`modal_show`)
        : null;
    } else return;
  }

  async changePost(isNext) {
    if (
      !this.sliderRight.classList.contains(`slider__item_blocked`) &&
      !this.sliderLeft.classList.contains(`slider__item_blocked`)
    ) {
      this.isLoading = false;
      const currentId = this.fullPostModel.id;
      const currentPostContainer = this.storage.getItem(
        this.storage.keys.postContainer,
      );
      const currentFullPostContainer = this.storage.getItem(
        this.storage.keys.fullPostContainer,
      );

      const currentIndex = currentPostContainer.findIndex(
        (post) => post.id == currentId,
      );

      let changeId;

      if (isNext) {
        try {
          changeId = currentPostContainer[currentIndex + 1].id;
        } catch {
          changeId = currentPostContainer[0].id;
        }
      } else {
        try {
          changeId = currentPostContainer[currentIndex - 1].id;
        } catch {
          changeId = currentPostContainer[currentPostContainer.length - 1].id;
        }
      }

      const changeIndex = currentFullPostContainer.findIndex(
        (item) => item.id == changeId,
      );

      if (!this.isLoading) {
        this.loader.initialize();
      }

      const post =
        changeIndex == -1
          ? await this.handler.fillFullPostContainer(changeId)
          : [currentFullPostContainer[changeIndex]];
      this.isLoading = true;

      this.fullPostModel = post[0];
      this.initialize();
    }
  }

  initialize() {
    this.render();
    this.initHosts();
    this.initListeners();
  }
}

export default Modal;
