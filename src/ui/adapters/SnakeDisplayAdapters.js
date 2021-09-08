function convertSnakeEdges(edges, xUnitPx = 1, yUnitPx = 1) {
  return edges.map((edge) => ({
    x: edge.x * xUnitPx,
    y: edge.y * yUnitPx,
  }));
}

// snake creation
// game board representation vs logical
