import GameContext from "../../context/GameContext";
import { GameEvents } from "../../../utils/Enumerations";
import { drawSquareAsCircle } from "../../UiUtils";
import styles from "./GameBoardLayers.scss";

class BoardTrophyLayer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountHTML();
    this.initializeCanvasContext();
    GameContext.subscribe(this.handleTrophyUpdated, GameEvents.TROPHY_CREATED);
  }

  initializeCanvasContext = () => {
    const canvas = this.getElementsByTagName("canvas")[0];
    this.canvasContext = canvas.getContext("2d");
  };

  handleTrophyUpdated = (game) => {
    this.drawTrophy(game.currentTrophy);
  };

  drawTrophy = (trophySquare) => {
    this.canvasContext.clearRect(
      0,
      0,
      GameContext.board.width,
      GameContext.board.height
    ); // TODO: check - can be optimized?
    drawSquareAsCircle(trophySquare, this.canvasContext, "#fc190d");
  };

  mountHTML = () => {
    const canvas = document.createElement("canvas");
    canvas.height = GameContext.board.height;
    canvas.width = GameContext.board.width;
    canvas.className = styles.gameBoardLayer;
    this.appendChild(canvas);
  };
}

window.customElements.define("board-trophy-layer", BoardTrophyLayer);

export default BoardTrophyLayer;
