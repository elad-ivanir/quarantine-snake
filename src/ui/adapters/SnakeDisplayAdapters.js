function convertSnakeEdges(edges, xUnitPx = 1, yUnitPx = 1) {
  return edges.map((edge) => ({
    x: edge.x * xUnitPx,
    y: edge.y * yUnitPx,
  }));
}

export function drawSnakeOnCanvas(snake, ctx, xUnitPx, yUnitPx) {
  const edgesPx = convertSnakeEdges(snake.edges, xUnitPx, yUnitPx);
  ctx.clearRect(0, 0, 600, 600); // aaaauuughhhhhh
  ctx.beginPath();
  ctx.moveTo(edgesPx[0].x, edgesPx[0].y);
  edgesPx.slice(1).forEach((edge) => {
    ctx.lineTo(edge.x, edge.y);
  });
  ctx.stroke();
}
