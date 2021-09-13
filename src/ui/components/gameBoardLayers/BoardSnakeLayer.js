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
    GameContext.subscribe(GameEvents.STEP, this.handleStep);
  }

  initializeCanvasContext = () => {
    const canvas = this.getElementsByTagName("canvas")[0];
    this.canvasContext = canvas.getContext("2d");
  };

  handleStep = (snake) => {
    this.canvasContext.clearRect(
      0,
      0,
      GameContext.board.width,
      GameContext.board.height
    );
    drawSnake(snake, this.canvasContext, "#ffffff", "3px");
  };

  mountHTML = () => {
    const canvas = document.createElement("canvas");
    canvas.height = GameContext.board.height;
    canvas.width = GameContext.board.width;
    this.className = styles.gameBoardLayerCanvas;
    this.appendChild(canvas);
  };
}

window.customElements.define("board-snake-layer", BoardSnakeLayer);

export default BoardSnakeLayer;
