function drawPoint(point, ctx, diameter = 2) {
  ctx.beginPath();
  ctx.fillRect(point.x, point.y, diameter, diameter);
}

function drawSnake(snake, ctx) {
  ctx.beginPath();
  ctx.moveTo(snake.edges[0].x, snake.edges[0].y);
  snake.edges.slice(1).forEach((edge) => {
    ctx.lineTo(edge.x, edge.y);
  });
  ctx.stroke();
}

export function drawGameOnCanvas(game, ctx) {
  // TODO: more efficent to only delete snake rectangle?
  ctx.clearRect(0, 0, game.board.width, game.board.height);
  drawSnake(game.snake, ctx);
  drawPoint(game.currentTrophyLocation, ctx);
}
