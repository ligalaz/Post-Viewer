class Header {
  constructor(header) {
    this.header = header;
  }

  render() {
    this.header.innerHTML = ` <div class="logo header__logo">
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
        <div class="search header__search">
          <input type="search" class="search__item" />
        </div>`;
  }

  initialize() {
    this.render();
  }
}

export default Header;
