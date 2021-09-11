import { generateTrophyLocation } from "./GameUtils";
import { areOpposite } from "./MathUtils";
import {
  makeStep as snakeMakeStep,
  getSnakeHeadDirection,
  snakeIntersectsWithSquare,
} from "./SnakeActions";

export class Game {
  constructor(board, snake) {
    this.board = board;
    this.snake = snake;
    this.currentTrophyLocation = generateTrophyLocation(this.snake, this.board);
    this.currentDirection = getSnakeHeadDirection(this.snake);
    this.gameLoopInterval = 10;
  }

  start = () => {
    this.gameLoopId = setInterval(this.makeStep, this.gameLoopInterval);
  };

  makeStep = () => {
    const isEating = snakeIntersectsWithSquare(
      this.snake,
      this.currentTrophyLocation
    );
    this.snake = snakeMakeStep(this.snake, this.currentDirection, isEating);
    if (!this.isGameStateValid()) {
      this.stop();
    }
    if (isEating) {
      this.currentTrophyLocation = generateTrophyLocation(
        this.snake,
        this.board
      );
    }
    this.onStep && this.onStep();
  };

  isGameStateValid = () => {
    return true;
  };

  stop = () => {
    clearInterval(this.gameLoopId);
    this.gameLoopId = undefined;
    this.onGameStopped && this.onGameStopped();
  };

  setDirection = (direction) => {
    if (!areOpposite(direction, this.currentDirection)) {
      this.currentDirection = direction;
    }
  };
}
