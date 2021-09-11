import { generateRandomSquare } from "./MathUtils";
import { snakeIntersectsWithSquare } from "./SnakeActions";

export function generateTrophyLocation(snake, board) {
  let square;
  const squareSize = 20;
  do {
    square = generateRandomSquare(board.width, board.height, squareSize);
  } while (snakeIntersectsWithSquare(snake, square));
  return square;
}
