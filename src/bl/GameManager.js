import { generateTrophyLocation } from "./GameActions";

export class GameManager {
  constructor(board, snake) {
    this.board = board;
    this.snake = snake;
    this.currentTrophyLocation = generateTrophyLocation(this.snake, this.board);
    this.currentDirection = getSnakeHeadDirection(this.snake);
    this.gameLoopInterval = 100;
  }

  start = () => {
    this.gameLoopId = setInterval(() => {}, this.gameLoopInterval);
  };

  stop = () => {
    clearInterval(this.gameLoopId);
  };

  setDirection = (direction) => {
    this.currentDirection = direction;
  };
}
