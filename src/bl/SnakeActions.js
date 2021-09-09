import * as mathUtils from "./MathUtils";

// TODO: null checks

function extendHead(snake, direction) {
  const headEdges = snake.edges.slice(-2);
  const headDirection = mathUtils.getAngle(...headEdges);
  if (mathUtils.areOpposite(headDirection, direction)) {
    return snake;
  }
  debugger;
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
      edges: tailEdges.slice(1),
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

export function makeStep(snake, direction) {
  return reduceEnd(extendHead(snake, direction));
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
