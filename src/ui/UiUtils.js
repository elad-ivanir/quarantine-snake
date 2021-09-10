export function drawGameOnCanvas(game, ctx) {
  ctx.clearRect(0, 0, game.board.width, game.board.height);
  ctx.beginPath();
  ctx.moveTo(game.snake.edges[0].x, game.snake.edges[0].y);
  game.snake.edges.slice(1).forEach((edge) => {
    ctx.lineTo(edge.x, edge.y);
  });
  ctx.stroke();
}
