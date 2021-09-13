import styles from "./HomePage.scss";
import "./GameBoardDisplay";

class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountHTML();
  }

  mountHTML = () => {
    const container = document.createElement("div");
    container.className = styles.homePageContainer;

    const gameBoard = document.createElement("game-board-display");

    container.appendChild(gameBoard);
    this.appendChild(container);
  };
}

window.customElements.define("home-page", HomePage);

export default HomePage;
