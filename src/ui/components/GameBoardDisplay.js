import { DirectionKey } from "../../utils/Enumerations";
import styles from "./GameBoardDisplay.scss";
import GameContext from "../context/GameContext";
import "./gameBoardLayers/BoardBackgroundLayer";
import "./gameBoardLayers/BoardSnakeLayer";
import "./gameBoardLayers/BoardTrophyLayer";

class GameBoardDisplay extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountHTML();
    this.initializeEvents();
  }

  disconnectedCallback() {
    this.clearEvents();
  }

  initializeEvents = () => {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("load", this.handleLoad);
  };

  clearEvents = () => {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("load", this.handleLoad);
  };

  handleLoad = () => {
    GameContext.start();
  };

  handleKeyDown = (e) => {
    const direction = DirectionKey[e.key];
    if (typeof direction !== "number") return;
    GameContext.setDirection(direction);
  };

  mountHTML = () => {
    const wrapper = document.createElement("div");
    wrapper.className = styles.gameBoardWrapper;

    const backgroundLayer = document.createElement("board-background-layer");
    const snakeLayer = document.createElement("board-snake-layer");
    const trohpyLayer = document.createElement("board-trophy-layer");
    wrapper.appendChild(backgroundLayer);
    wrapper.appendChild(snakeLayer);
    wrapper.appendChild(trohpyLayer);

    this.appendChild(wrapper);
  };
}

window.customElements.define("game-board-display", GameBoardDisplay);

export default GameBoardDisplay;
