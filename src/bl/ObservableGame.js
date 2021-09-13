import { createObject } from "./MiscUtils";
import { Game } from "./Game";

export const GameEvents = {
  STOP: "stop",
  STEP: "step",
  SCORE_CHANGED: "score",
};

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

  setScore = (score) => {
    super.setScore(score);
    this.notify(GameEvents.SCORE_CHANGED, score);
  };

  stop = () => {
    super.stop();
    this.notify(GameEvents.STOP);
  };

  makeStep = (...args) => {
    super.makeStep(...args);
    this.notify(GameEvents.STEP);
  };
}
