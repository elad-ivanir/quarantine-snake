import { generateRandomPoint } from "./MathUtils";
import { snakeIncludesPoint } from "./SnakeActions";

export function generateTrophyLocation(snake, board) {
  let point;
  do {
    point = generateRandomPoint(board.width, board.height);
  } while (snakeIncludesPoint(snake, point));
  return point;
}
