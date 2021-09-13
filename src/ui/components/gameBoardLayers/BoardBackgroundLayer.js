import backgroundImageSrc from "../../../assets/images/board-background.png";
import styles from "./GameBoardLayers.scss";

class BoardBackgroundLayer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountHTML();
  }

  mountHTML = () => {
    const backgroundImage = document.createElement("img");
    backgroundImage.classList.add(styles.gameBoardBackground);
    backgroundImage.classList.add(styles.gameBoardLayer);
    backgroundImage.src = backgroundImageSrc;
    this.appendChild(backgroundImage);
  };
}

window.customElements.define("board-background-layer", BoardBackgroundLayer);
