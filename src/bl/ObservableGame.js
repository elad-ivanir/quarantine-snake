import { createObject } from "./MiscUtils";
import { Game } from "./Game";
import { GameEvents } from "../utils/Enumerations";

export class ObservableGame extends Game {
  constructor(board, snake) {
    super(board, snake);
    this.listeners = createObject(Object.values(GameEvents), []);
  }

  subscribe(listener, event) {
    this.listeners[event] = [...this.listeners[event], listener];
  }

  notify(event) {
    this.listeners[event].forEach((listener) => {
      if (typeof listener === "function") {
        listener(this);
      }
    });
  }

  setScore(...args) {
    super.setScore(...args);
    this.notify(GameEvents.SCORE_CHANGED);
  }

  start() {
    super.start();
    this.notify(GameEvents.START);
  }

  stop() {
    super.stop();
    this.notify(GameEvents.STOP);
  }

  makeStep(...args) {
    super.makeStep(...args);
    this.notify(GameEvents.STEP);
  }

  generateNewTrophy() {
    super.generateNewTrophy();
    this.notify(GameEvents.TROPHY_CREATED);
  }
}
