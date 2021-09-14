import { DirectionKey, GameEvents } from "../../utils/Enumerations";
import styles from "./GameBoardDisplay.scss";
import GameContext from "../context/GameContext";
import "./gameBoardLayers/BoardBackgroundLayer";
import "./gameBoardLayers/BoardSnakeLayer";
import "./gameBoardLayers/BoardTrophyLayer";
import "./gameBoardLayers/BoardGameOverLayer";

class GameBoardDisplay extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountGameHTML();
    this.initializeEvents();
    GameContext.subscribe(this.handleGameStopped, GameEvents.STOP);
    GameContext.subscribe(this.handleGameStarted, GameEvents.START);
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

  handleGameStopped = () => {
    this.mountGameOverHTML();
  };

  handleGameStarted = () => {
    this.unmountGameOverHTML();
  };

  mountGameHTML = () => {
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

  mountGameOverHTML = () => {
    const wrapper = this.getElementsByClassName(styles.gameBoardWrapper)[0];
    const gameOverScreen = document.createElement("board-game-over-layer");
    wrapper.appendChild(gameOverScreen);
  };

  unmountGameOverHTML = () => {
    const gameOverScreen = this.getElementsByTagName(
      "board-game-over-layer"
    )[0];
    if (gameOverScreen) {
      const wrapper = this.getElementsByClassName(styles.gameBoardWrapper)[0];
      wrapper.removeChild(gameOverScreen);
    }
  };
}

window.customElements.define("game-board-display", GameBoardDisplay);

export default GameBoardDisplay;
