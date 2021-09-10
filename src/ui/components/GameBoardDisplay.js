import { Board } from "../../bl/Board";
import { Snake } from "../../bl/Snake";
import { Game } from "../../bl/Game";
import { DirectionKey } from "../../utils/Enumerations";
import { BOARD_HEIGHT, BOARD_WIDTH, DEFAULT_SNAKE_EDGES } from "../constants";
import styles from "./GameBoardDisplay.scss";
import { drawGameOnCanvas } from "../UiUtils";

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
    const board = new Board(BOARD_HEIGHT, BOARD_WIDTH);
    const snake = new Snake(DEFAULT_SNAKE_EDGES);
    this.game = new Game(board, snake);
    this.game.onStep = this.handleStep;
  }

  initializeEvents = () => {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("load", this.handleLoad);
  };

  clearEvents = () => {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("load", this.handleLoad);
  };

  initializeCanvasContext = () => {
    const canvas = document.getElementById("game-board-canvas");
    this.canvasContext = canvas.getContext("2d");
    this.drawCurrentState();
  };

  handleKeyDown = (e) => {
    const direction = DirectionKey[e.key];
    if (typeof direction !== "number") return;
    this.game.setDirection(direction);
  };

  handleLoad = () => {
    this.game.start();
  };

  handleStep = () => {
    this.drawCurrentState();
  };

  drawCurrentState = () => {
    drawGameOnCanvas(this.game, this.canvasContext);
  };

  mountHTML = () => {
    this.innerHTML = `
    <canvas
      id="game-board-canvas"
      class="${styles.gameBoardCanvas}"
      height="${this.game.board.height}px"
      width="${this.game.board.width}px"
      >
    </canvas>
  `;
  };
}

window.customElements.define("game-board-display", GameBoardDisplay);

export default GameBoardDisplay;
