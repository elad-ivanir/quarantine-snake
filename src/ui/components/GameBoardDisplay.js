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
    this.initializeState();
    this.mountHTML();
    this.initializeCanvasContext();
    this.initializeEvents();
  }

  disconnectedCallback() {
    this.clearEvents();
  }

  initializeState() {
    this.board = new Board(20, 20);
    this.snake = new Snake([
      { x: 2, y: 4 },
      { x: 10, y: 4 },
    ]);
  }

  initializeEvents = () => {
    window.addEventListener("keydown", this.handleKeyDown);
  };

  clearEvents = () => {
    window.removeEventListener("keydown", this.handleKeyDown);
  };

  updateSnake = (snake) => {
    this.snake = snake;
    this.drawSnake();
  };

  initializeCanvasContext = () => {
    const canvas = document.getElementById("game-board-canvas");
    this.canvasContext = canvas.getContext("2d");
    this.drawSnake();
  };

  handleKeyDown = (e) => {
    const direction = DirectionKey[e.key];
    if (typeof direction !== "number") return;
    const newSnake = makeStep(this.snake, direction);
    this.updateSnake(newSnake);
  };

  drawSnake = () => {
    drawSnakeOnCanvas(this.snake, this.canvasContext, 30, 30);
  };

  mountHTML = () => {
    this.innerHTML = `
    <canvas
      id="game-board-canvas"
      class="${styles.gameBoardCanvas}"
      height="${this.board.height * 30}px"
      width="${this.board.width * 30}px"
      >
    </canvas>
  `;
  };
}

window.customElements.define("game-board-display", GameBoardDisplay);

export default GameBoardDisplay;
