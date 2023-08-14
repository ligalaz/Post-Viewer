import Handler from "../Services/Handler.js";
import Comments from "./Comments.js";
import Storage from "../Services/Storage.js";
import Loader from "../Loader.js";

class Modal {
  constructor(modal, fullPostModel) {
    this.modal = modal;
    this.fullPostModel = fullPostModel;
    this.handler = new Handler();
    this.storage = new Storage(sessionStorage);
    this.loader = new Loader(this.modal);
    this.isLoading = true;
  }

  render() {
    this.modal.innerHTML = `<div class="modal__body">
            <div class="close modal__close">
              <svg
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
              <div class="modal__edit modal__settings_item">
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
              </div>
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
    });

    this.sliderRight.addEventListener(`click`, () => {
      this.changePost(true);
    });
    this.sliderLeft.addEventListener(`click`, () => {
      this.changePost(false);
    });
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

  initialize() {
    this.render();
    this.initHosts();
    this.initListeners();
  }
}

export default Modal;
