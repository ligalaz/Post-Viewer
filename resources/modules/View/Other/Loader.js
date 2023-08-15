class Loader {
  constructor(provider) {
    this.provider = provider;
  }

  render() {
    this.provider.innerHTML = `<div class="loader main__loader">
                                    <div class="loader__item"></div>
                                    <p class="loader__text">Please waiting</p>
                              </div>`;
  }

  initialize() {
    this.render();
  }
}

export default Loader;
