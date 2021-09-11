function drawSquare(square, ctx) {
  ctx.beginPath();
  ctx.fillRect(square.x, square.y, square.size, square.size);
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
  drawSquare(game.currentTrophyLocation, ctx);
}
