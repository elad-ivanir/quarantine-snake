import GameContext from "../../context/GameContext";
import styles from "./GameBoardLayers.scss";

class GameOverScreen extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountHTML();
  }

  handleRestartClick = () => {
    GameContext.start();
  };

  mountHTML = () => {
    const container = document.createElement("div");
    container.classList.add(styles.gameBoardLayer);
    container.classList.add(styles.gameOverContainer);

    const title = document.createElement("h2");
    title.textContent = "GAME OVER";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.onclick = this.handleRestartClick;

    container.appendChild(title);
    container.appendChild(restartButton);
    this.appendChild(container);
  };
}

window.customElements.define("board-game-over-layer", GameOverScreen);
