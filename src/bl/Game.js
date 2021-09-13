import { DEFAULT_GAME_INTERVAL } from "../utils/Constants";
import { generateTrophyLocation } from "./GameUtils";
import { areOpposite } from "./MathUtils";
import {
  makeStep as snakeMakeStep,
  getSnakeHeadDirection,
  snakeIntersectsWithSquare,
  snakeHitsBounds,
  snakeHitsItself,
} from "./SnakeActions";

export class Game {
  constructor(board, snake) {
    this.board = board;
    this.snake = snake;
  }

  start = () => {
    this.resetState();
    this.gameLoopId = setInterval(this.makeStep, this.gameLoopInterval);
  };

  resetState = () => {
    this.setScore(0);
    this.currentTrophy = generateTrophyLocation(this.snake, this.board);
    this.currentDirection = getSnakeHeadDirection(this.snake);
    this.gameLoopInterval = DEFAULT_GAME_INTERVAL;
  };

  makeStep = () => {
    const isEating = snakeIntersectsWithSquare(this.snake, this.currentTrophy);
    const trophySize = this.currentTrophy.size;
    this.snake = snakeMakeStep(
      this.snake,
      this.currentDirection,
      isEating ? trophySize : 0
    );
    if (!this.isGameStateValid()) {
      this.stop();
    }
    if (isEating) {
      this.setScore(this.score + this.currentTrophy.size);
      this.generateNewTrophy();
    }
  };

  isGameStateValid = () => {
    return !(
      snakeHitsBounds(this.snake, this.board.width, this.board.height) ||
      snakeHitsItself(this.snake)
    );
  };

  stop = () => {
    clearInterval(this.gameLoopId);
    this.gameLoopId = undefined;
  };

  setDirection = (direction) => {
    if (!areOpposite(direction, this.currentDirection)) {
      this.currentDirection = direction;
    }
  };

  setScore = (score) => {
    this.score += score;
  };

  generateNewTrophy = () => {
    this.currentTrophy = generateTrophyLocation(this.snake, this.board);
  };
}
