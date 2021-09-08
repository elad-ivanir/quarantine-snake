class CustomHTMLElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.registerEvents();
  }

  disconnectedCallback() {
    this.clearEvents();
  }
}

export default CustomHTMLElement;
