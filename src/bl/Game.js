import { generateTrophyLocation } from "./GameUtils";
import { isInFrontOfSnake, makeStep as snakeMakeStep } from "./SnakeActions";

export class Game {
  constructor(board, snake) {
    this.board = board;
    this.snake = snake;
    this.currentTrophyLocation = generateTrophyLocation(this.snake, this.board);
    this.currentDirection = getSnakeHeadDirection(this.snake);
    this.gameLoopInterval = 100;
  }

  start = () => {
    this.gameLoopId = setInterval(makeStep, this.gameLoopInterval);
  };

  makeStep = () => {
    this.snake = snakeMakeStep(
      this.snake,
      this.currentDirection,
      isInFrontOfSnake(this.snake, this.currentTrophyLocation)
    );
    if (!this.isGameStateValid()) {
      this.stop();
    }
  };

  isGameRunning = () => {
    return !!this.gameLoopId;
  };

  isGameStateValid = () => {
    return true;
  };

  stop = () => {
    clearInterval(this.gameLoopId);
    this.gameLoopId = undefined;
  };

  setDirection = (direction) => {
    this.currentDirection = direction;
  };
}
