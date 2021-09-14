import { DEFAULT_GAME_INTERVAL } from "../utils/Constants";
import { generateTrophyLocation } from "./GameUtils";
import { areOpposite } from "./MathUtils";
import {
  makeStep as snakeMakeStep,
  getSnakeHeadDirection,
  snakeIntersectsWithSquare,
  snakeHitsBounds,
  snakeHitsItself,
  generateRandomSnake,
} from "./SnakeActions";

export class Game {
  constructor(board) {
    this.board = board;

    this.start = this.start.bind(this);
    this.resetState = this.resetState.bind(this);
    this.makeStep = this.makeStep.bind(this);
    this.isGameStateValid = this.isGameStateValid.bind(this);
    this.stop = this.stop.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.setScore = this.setScore.bind(this);
    this.generateNewTrophy = this.generateNewTrophy.bind(this);
    this.generateNewSnake = this.generateNewSnake.bind(this);
  }

  start() {
    this.resetState();
    this.gameLoopId = setInterval(this.makeStep, this.gameLoopInterval);
  }

  resetState() {
    this.setScore(0);
    this.generateNewSnake();
    this.generateNewTrophy();
    this.currentDirection = getSnakeHeadDirection(this.snake);
    this.gameLoopInterval = DEFAULT_GAME_INTERVAL;
  }

  makeStep() {
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
  }

  isGameStateValid() {
    return !(
      snakeHitsBounds(this.snake, this.board.width, this.board.height) ||
      snakeHitsItself(this.snake)
    );
  }

  stop() {
    clearInterval(this.gameLoopId);
    this.gameLoopId = undefined;
  }

  setDirection(direction) {
    if (!areOpposite(direction, this.currentDirection)) {
      this.currentDirection = direction;
    }
  }

  setScore(score) {
    this.score = score;
  }

  generateNewTrophy() {
    this.currentTrophy = generateTrophyLocation(this.snake, this.board);
  }

  generateNewSnake() {
    this.snake = generateRandomSnake(this.board.width, this.board.height);
  }
}
