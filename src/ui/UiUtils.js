export function drawSquareAsCircle(square, ctx, fillColor) {
  const centerX = Math.floor(square.x + square.size / 2);
  const centerY = Math.floor(square.y + square.size / 2); // decimal is bad for performance
  ctx.beginPath();
  ctx.fillStyle = fillColor;
  ctx.arc(centerX, centerY, square.size / 2, 0, 2 * Math.PI);
  ctx.fill();
}

export function drawSnake(snake, ctx, color, lineWidth) {
  ctx.beginPath();
  ctx.moveTo(snake.edges[0].x, snake.edges[0].y);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  snake.edges.slice(1).forEach((edge) => {
    ctx.lineTo(edge.x, edge.y);
  });
  ctx.stroke();
}
