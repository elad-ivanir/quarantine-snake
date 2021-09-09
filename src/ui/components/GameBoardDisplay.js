import { Board } from "../../bl/Board";
import { Snake } from "../../bl/Snake";
import { makeStep } from "../../bl/SnakeActions";
import { DirectionKey } from "../../utils/Enumerations";
import { drawSnakeOnCanvas } from "../adapters/SnakeDisplayAdapters";
import styles from "./GameBoardDisplay.scss";

class GameBoardDisplay extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initializeEvents();
    this.initializeState(); // TODO: fix - state depends on events
  }

  connectedCallback() {
    this.clearEvents();
  }

  initializeEvents() {
    window.addEventListener("load", this.handleCanvasLoad);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  clearEvents() {
    window.removeEventListener("load", this.handleCanvasLoad);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  initializeState() {
    this.board = new Board(20, 20);
    this.updateSnake(
      new Snake([
        { x: 2, y: 2 },
        { x: 4, y: 2 },
      ])
    );
  }

  updateSnake(snake) {
    this.snake = snake;
    this.drawSnake();
  }

  handleCanvasLoad() {
    const canvas = document.getElementById("game-board-canvas");
    this.canvasContext = canvas.getContext("2d");
  }

  handleKeyDown(e) {
    const direction = DirectionKey[e.key];
    if (!direction) return;
    const newSnake = makeStep(this.snake, direction);
    this.updateSnake(newSnake);
  }

  drawSnake() {
    drawSnakeOnCanvas(this.snake, this.canvasContext);
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
