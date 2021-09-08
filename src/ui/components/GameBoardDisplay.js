import styles from "./GameBoardDisplay.scss";
import CustomHTMLElement from "./CustomHTMLElement";

class GameBoardDisplay extends CustomHTMLElement {
  constructor() {
    super();
  }

  registerEvents() {}

  clearEvents() {}

  render() {
    this.innerHTML = `
    <canvas class=${styles.gameBoardCanvas}></canvas>
  `;
  }
}

window.customElements.define("game-board-display", GameBoardDisplay);

export default GameBoardDisplay;
