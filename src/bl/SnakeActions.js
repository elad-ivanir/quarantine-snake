import {
  areOpposite,
  getAngle,
  getDistance,
  createDistantPoint,
  lineIncludesPoint,
} from "./MathUtils";

// TODO: null checks

function extendHead(snake, direction) {
  const headEdges = snake.headEdges.slice(-2);
  const headDirection = getAngle(...headEdges);
  if (areOpposite(headDirection, direction)) {
    return;
  }
  const newEdge = createDistantPoint(
    snake.edges[snake.edges.length],
    1,
    direction
  );
  const edges = snake.edges.splice(
    -1,
    direction === headDirection ? 1 : 0, // create new edge if direction has changed
    newEdge
  );
  return {
    ...snake,
    edges,
  };
}

function reduceEnd(snake) {
  const tailEdges = snake.edges.slice(0, 2);
  const tailLength = getDistance(...tailEdges);
  if (tailLength <= 1) {
    return {
      ...snake,
      edges: tailEdges.slice(1),
    };
  }
  const tailReverseDirection = getAngle(...tailEdges.reverse());
  const newEnd = createDistantPoint(
    tailEdges[1],
    tailLength - 1,
    tailReverseDirection
  );
  return {
    ...snake,
    edges: tailEdges.splice(0, 1, newEnd),
  };
}

export function makeStep(snake, direction) {
  return reduceEnd(extendHead(snake, direction));
}

export function snakeIncludesPoint(snake, point) {
  for (let i = 0; i < snake.edges.length - 1; i++) {
    if (lineIncludesPoint(snake.edges[i], snake.edges[i + 1], point)) {
      return true;
    }
  }
  return false;
}
