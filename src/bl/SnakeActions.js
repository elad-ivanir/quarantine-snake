import * as mathUtils from "./MathUtils";

function extendHead(snake, direction) {
  const headDirection = getSnakeHeadDirection(snake);
  const newEdge = mathUtils.createDistantPoint(
    snake.edges[snake.edges.length - 1],
    1,
    direction
  );

  const edges = mathUtils.floatEquals(headDirection, direction)
    ? [...snake.edges.slice(0, -1), newEdge]
    : [...snake.edges, newEdge];

  return {
    ...snake,
    edges,
  };
}

function reduceEnd(snake) {
  const tailEdges = snake.edges.slice(0, 2);
  const tailLength = mathUtils.getDistance(...tailEdges);
  if (tailLength <= 1) {
    return {
      ...snake,
      edges: snake.edges.slice(1),
    };
  }
  const tailReverseDirection = mathUtils.getAngle(tailEdges[1], tailEdges[0]);
  const newEnd = mathUtils.createDistantPoint(
    tailEdges[1],
    tailLength - 1,
    tailReverseDirection
  );
  return {
    ...snake,
    edges: [newEnd, ...snake.edges.slice(1)],
  };
}

function isStepPossible(snake, direction) {
  const headDirection = getSnakeHeadDirection(snake);
  return !mathUtils.areOpposite(headDirection, direction);
}

export function getSnakeHeadDirection(snake) {
  const headEdges = snake.edges.slice(-2);
  return mathUtils.getAngle(...headEdges);
}

export function makeStep(snake, direction, isEating = false) {
  if (!isStepPossible(snake, direction)) {
    return snake;
  }
  const extendedSnake = extendHead(snake, direction);
  return isEating ? extendedSnake : reduceEnd(extendedSnake);
}

export function isInFrontOfSnake(snake, point) {
  const direction = getSnakeHeadDirection(snake);
  const pointInFront = mathUtils.createDistantPoint(
    snake.edges[snake.edges.length - 1],
    1,
    direction
  );
  return mathUtils.pointEquals(point, pointInFront);
}

export function snakeIncludesPoint(snake, point) {
  for (let i = 0; i < snake.edges.length - 1; i++) {
    if (
      mathUtils.lineIncludesPoint(snake.edges[i], snake.edges[i + 1], point)
    ) {
      return true;
    }
  }
  return false;
}
