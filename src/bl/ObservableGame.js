import { createObject } from "./MiscUtils";
import { Game } from "./Game";
import { GameEvents } from "../utils/Enumerations";

export class ObservableGame extends Game {
  constructor(board, snake) {
    super(board, snake);
    this.listeners = createObject(Object.keys(GameEvents), []);
  }

  subscribe = (listener, event) => {
    this.listeners[event].push(listener);
  };

  notify = (event, data) => {
    this.listeners[event].forEach((listener) => {
      if (typeof listener === "function") {
        listener(data);
      }
    });
  };

  setScore = (...args) => {
    super.setScore(...args);
    this.notify(GameEvents.SCORE_CHANGED, this.score);
  };

  stop = () => {
    super.stop();
    this.notify(GameEvents.STOP);
  };

  makeStep = (...args) => {
    super.makeStep(...args);
    this.notify(GameEvents.STEP, this.snake);
  };

  generateNewTrophy = () => {
    super.generateNewTrophy();
    this.notify(GameEvents.TROPHY_CREATED, this.currentTrophy);
  };
}
