import { Board } from "../../bl/Board";
import { Snake } from "../../bl/Snake";
import { Game } from "../../bl/Game";
import { DirectionKey } from "../../utils/Enumerations";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DEFAULT_SNAKE_EDGES,
} from "../..utils/Constants";
import styles from "./GameBoardDisplay.scss";
import { drawSnake, drawSquareAsCircle } from "../UiUtils";
import backgroundImageSrc from "../../assets/images/board-background.png";

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
  };

  handleKeyDown = (e) => {
    const direction = DirectionKey[e.key];
    if (typeof direction !== "number") return;
    this.game.setDirection(direction);
  };

  handleLoad = () => {
    this.game.start();
    this.drawCurrentState();
  };

  handleStep = () => {
    this.drawCurrentState();
  };

  drawCurrentState = () => {
    this.canvasContext.clearRect(
      0,
      0,
      this.game.board.width,
      this.game.board.height
    );
    drawSnake(this.game.snake, this.canvasContext, "#ffffff", 3);
    drawSquareAsCircle(
      this.game.currentTrophyLocation,
      this.canvasContext,
      "#fc190d"
    );
  };

  mountHTML = () => {
    const wrapper = document.createElement("div");
    wrapper.className = styles.gameBoardWrapper;

    const boardCanvas = document.createElement("canvas");
    boardCanvas.id = "game-board-canvas";
    boardCanvas.className = `${styles.gameBoardCanvas} ${styles.fullSize}`;
    boardCanvas.height = this.game.board.height;
    boardCanvas.width = this.game.board.width;

    const backgroundImage = document.createElement("img");
    backgroundImage.className = `${styles.gameBoardBackground} ${styles.fullSize}`;
    backgroundImage.src = backgroundImageSrc;

    wrapper.appendChild(backgroundImage);
    wrapper.appendChild(boardCanvas);
    this.appendChild(wrapper);
  };
}

window.customElements.define("game-board-display", GameBoardDisplay);

export default GameBoardDisplay;
