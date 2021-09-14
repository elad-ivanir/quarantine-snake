import { Snake } from "./Snake";
import * as mathUtils from "./MathUtils";

function extendHead(snake, direction, count = 1) {
  const headDirection = getSnakeHeadDirection(snake);
  const newEdge = mathUtils.createDistantPoint(
    snake.edges[snake.edges.length - 1],
    count,
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

export function makeStep(snake, direction, eatCount = 0) {
  if (!isStepPossible(snake, direction)) {
    return snake;
  }
  const extendedSnake = extendHead(snake, direction, eatCount + 1);
  return eatCount ? extendedSnake : reduceEnd(extendedSnake);
}

export function snakeIntersectsWithSquare(snake, square) {
  for (let i = 0; i < snake.edges.length - 1; i++) {
    if (
      mathUtils.lineIntersectsWithSquare(
        snake.edges[i],
        snake.edges[i + 1],
        square
      )
    ) {
      return true;
    }
  }
  return false;
}

export function snakeHitsItself(snake) {
  const head = snake.edges[snake.edges.length - 1];
  const rest = snake.edges.slice(0, -1);
  for (let i = 0; i < rest.length - 1; i++) {
    if (mathUtils.lineIncludesPoint(snake.edges[i], snake.edges[i + 1], head))
      return true;
  }
  return false;
}

export function snakeHitsBounds(snake, xBound, yBound) {
  const head = snake.edges[snake.edges.length - 1];
  return (
    mathUtils.floatEquals(head.x, 0) ||
    mathUtils.floatEquals(head.y, 0) ||
    mathUtils.floatEquals(head.x, xBound) ||
    mathUtils.floatEquals(head.y, yBound)
  );
}

export function generateRandomSnake(maxX, maxY) {
  // only generates horizontical snakes, perhaps will be improved in the future
  const y = mathUtils.randomInt(0, maxY);
  let x1, x2;
  do {
    x1 = mathUtils.randomInt(0, maxX);
    x2 = mathUtils.randomInt(0, maxX);
  } while (x1 === x2);
  return new Snake([
    {
      x: Math.min(x1, x2),
      y,
    },
    {
      x: Math.max(x1, x2),
      y,
    },
  ]);
}
