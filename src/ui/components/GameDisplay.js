class GameDisplay extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountHTML();
  }

  mountHTML = () => {};
}

window.customElements.define("game-display", GameDisplay);
