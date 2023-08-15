class Footer {
  constructor(footer) {
    this.footer = footer;
  }

  render() {
    this.footer.innerHTML = ` <div class="title footer__title">Find me in:</div>
        <nav class="navigation footer__navigation">
          <ul class="navigation-menu footer__navigation-menu">
            <li class="menu-item footer__menu-item">
              <a
                class="link"
                href="https://www.linkedin.com/in/artsiom-mikula-495a73221/"
                target="_blank"
                ><svg class="link__icon">
                  <use
                    xlink:href="./resources/icons/contacts/linkedin.svg#linkedin"
                  ></use>
                </svg>
              </a>
            </li>
            <li class="menu-item footer__menu-item">
              <a
                class="link"
                href="https://rabota.by/resume/8e066c9aff0b966e3d0039ed1f55596c554a6a"
                target="_blank"
                ><svg class="link__icon">
                  <use
                    xlink:href="./resources/icons/contacts/rabota.svg#rabota"
                  ></use>
                </svg>
              </a>
            </li>
            <li class="menu-item footer__menu-item">
              <a class="link" href="https://github.com/ligalaz" target="_blank">
                <svg class="link__icon">
                  <use
                    xlink:href="./resources/icons/contacts/github.svg#github"
                  ></use>
                </svg>
              </a>
            </li>
            <li class="menu-item footer__menu-item menu-item_middle">
              <a class="link" href="tel:+375292310731" target="_blank">
                <svg class="link__icon">
                  <use
                    xlink:href="./resources/icons/contacts/phone.svg#phone"
                  ></use>
                </svg>
              </a>
            </li>
            <li class="menu-item footer__menu-item">
              <a
                class="link"
                href="mailto:95artm.mick@gmail.com"
                target="_blank"
              >
                <svg class="link__icon">
                  <use
                    xlink:href="./resources/icons/contacts/gmail.svg#gmail"
                  ></use>
                </svg>
              </a>
            </li>
            <li class="menu-item footer__menu-item">
              <a
                class="link"
                href="https://discordapp.com/users/742091236944511088"
                target="_blank"
              >
                <svg class="link__icon">
                  <use
                    xlink:href="./resources/icons/contacts/discord.svg#discord"
                  ></use>
                </svg>
              </a>
            </li>
          </ul>
        </nav>`;
  }

  initialize() {
    this.render();
  }
}

export default Footer;
