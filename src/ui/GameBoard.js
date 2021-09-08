import styles from "./GameBoard.scss";

class GameBoard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <canvas class=${styles.gameBoardCanvas}></canvas>
  `;
  }
}

window.customElements.define("game-board", GameBoard);

export default GameBoard;
