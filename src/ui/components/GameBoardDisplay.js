import { Board } from "../../bl/Board";
import { Snake } from "../../bl/Snake";
import { DirectionKey } from "../../utils/Enumerations";
import styles from "./GameBoardDisplay.scss";

class GameBoardDisplay extends HTMLElement {
  constructor() {
    super();
    this.board = new Board(20, 20);
  }

  connectedCallback() {
    this.render();
    window.addEventListener("load", this.handleCanvasLoad);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleCanvasLoad() {
    const snake = new Snake([
      { x: 2, y: 2 },
      { x: 4, y: 2 },
    ]);
    const canvas = document.getElementById("game-board-canvas");
    this.ctx = canvas.getContext("2d");
    this.ctx.beginPath();
    this.ctx.moveTo(snake.edges[0].x * 30, snake.edges[0].y * 30);
    this.ctx.lineTo(snake.edges[1].x * 30, snake.edges[1].y * 30);
    this.ctx.stroke();
    // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  handleKeyDown(e) {
    console.log(e);
    const direction = DirectionKey[e.key];
  }

  render() {
    this.innerHTML = `
    <canvas
      id="game-board-canvas"
      class=${styles.gameBoardCanvas}
      style="
        height: ${this.board.height * 30}px;
        width: ${this.board.width * 30}px;
      "
      >
    </canvas>
  `;
  }
}

window.customElements.define("game-board-display", GameBoardDisplay);

export default GameBoardDisplay;
