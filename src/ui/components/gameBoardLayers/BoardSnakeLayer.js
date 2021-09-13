import GameContext from "../../context/GameContext";
import { GameEvents } from "../../../utils/Enumerations";
import { drawSnake } from "../../UiUtils";
import styles from "./GameBoardLayers.scss";

class BoardSnakeLayer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountHTML();
    this.initializeCanvasContext();
    GameContext.subscribe(this.handleStep, GameEvents.STEP);
  }

  initializeCanvasContext = () => {
    const canvas = this.getElementsByTagName("canvas")[0];
    this.canvasContext = canvas.getContext("2d");
  };

  handleStep = (game) => {
    this.canvasContext.clearRect(
      0,
      0,
      GameContext.board.width,
      GameContext.board.height
    );
    drawSnake(game.snake, this.canvasContext, "#ffffff", 3);
  };

  mountHTML = () => {
    const canvas = document.createElement("canvas");
    canvas.height = GameContext.board.height;
    canvas.width = GameContext.board.width;
    this.className = styles.gameBoardLayer;
    this.appendChild(canvas);
  };
}

window.customElements.define("board-snake-layer", BoardSnakeLayer);

export default BoardSnakeLayer;
