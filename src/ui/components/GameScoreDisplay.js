import { GameEvents } from "../../utils/Enumerations";
import GameContext from "../context/GameContext";

class GameScoreDisplay extends GameScoreDisplay {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mountHTML();
    GameContext.subscribe(this.handleScoreChanged, GameEvents.SCORE_CHANGED);
  }

  handleScoreChanged = (game) => {
    const scoreParagraph = this.getElementByTagName("p")[0];
    scoreParagraph.innerHTML = game.score;
  };

  mountHTML = () => {
    const scoreParagraph = document.createElement("p");
    this.appendChild(scoreParagraph);
  };
}

window.customElements.define("game-score-display", GameScoreDisplay);

export default GameScoreDisplay;
