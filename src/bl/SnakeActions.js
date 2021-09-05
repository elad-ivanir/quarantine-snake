import { Direction, InvertDirection } from "../utils/Enumerations";

function getDirection(edge1, edge2) {
  if (!edge1 || !edge2) return Direction.UNKNOWN;

  const verticalDistance = edge2.y - edge1.y;
  const horizonticalDistance = edge2.x - edge1.x;

  if (verticalDistance > 0) return Direction.DOWN;
  else if (verticalDistance < 0) return Direction.UP;
  else if (horizonticalDistance > 0) return Direction.RIGHT;
  else if (horizonticalDistance < 0) return Direction.LEFT;

  return Direction.UNKNOWN;
}

function addToHead(snake, direction) {
  const headEdges = (snake.edges || []).slice(-2);
  const headDirection = getDirection(...headEdges);
  if (direction === InvertDirection[headDirection]) {
    return;
  }
}

export function makeStep(snake, direction) {}
