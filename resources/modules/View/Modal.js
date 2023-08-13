class Modal {
  constructor(modal) {
    this.modal = modal;
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
                value="title title title title title "
                maxlength="30"
                disabled
              />
            </div>
            <div class="author modal__author">
              <div class="author__name">John Doe</div>
              <div class="author__job">Frontend</div>
              <div class="author__bureau">IBM New-York Department</div>
              <hr />
            </div>

            <div class="content modal__content">
              <p class="content__annotation">writes:</p>
              <textarea
                class="content__text"
                name=""
                id=""
                cols="1"
                rows="6"
                wrap="soft"
                style="resize: none"
                disabled
              >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis, voluptate quibusdam doloribus veniam animi labore
              quidem explicabo odit deleniti ea soluta repudiandae quam dolorum
              omnis, sint amet. Repellendus, consequatur mollitia. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Enim exercitationem
              dolorum delectus mollitia aut impedit illum totam architecto
              maiores asperiores fugiat esse perspiciatis, et facere ducimus
              necessitatibus. Laboriosam, atque molestiae.</textarea
              >

              <p class="content__tags">#Lorem, #ipsum, #dolor</p>
              <hr />
            </div>

            <div class="comments modal__comments">
              <div class="comments__show">Show comments</div>
              <div class="comments__row">
                <div class="comments__item">
                  <div class="comments__text">Lorem ipsum dolor s</div>
                  <div class="comments__author">John Smith</div>
                </div>
                <div class="comments__item">
                  <div class="comments__text">Lorem ipsum dolor s</div>
                  <div class="comments__author">John Smith</div>
                </div>
                <div class="comments__item">
                  <div class="comments__text">Lorem ipsum dolor s</div>
                  <div class="comments__author">John Smith</div>
                </div>
                <div class="comments__item">
                  <div class="comments__text">Lorem ipsum dolor s</div>
                  <div class="comments__author">John Smith</div>
                </div>
                <div class="comments__item">
                  <div class="comments__text">Lorem ipsum dolor s</div>
                  <div class="comments__author">John Smith</div>
                </div>
              </div>
              <hr />
            </div>
            <div class="slider modal__slider">
              <div class="slider__item modal__slider_left">previous post</div>
              <div class="slider__item modal__slider_right">next post</div>
            </div>
          </div>`;
  }

  initialize() {
    this.render();
  }
}

export default Modal;
