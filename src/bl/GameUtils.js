import { DEFAULT_TROPHY_SIZE } from "../utils/Constants";
import { generateRandomSquare } from "./MathUtils";
import { snakeIntersectsWithSquare } from "./SnakeActions";

export function generateTrophyLocation(
  snake,
  board,
  squareSize = DEFAULT_TROPHY_SIZE
) {
  let square;
  do {
    square = generateRandomSquare(board.width, board.height, squareSize);
  } while (snakeIntersectsWithSquare(snake, square));
  return square;
}
