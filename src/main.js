import "./ui/components/GameBoardDisplay";
import bodyBackgroundSrc from "./assets/images/body-background.jpg";

function main() {
  const gameBoard = document.createElement("game-board-display");
  document.body.style.backgroundImage = `url(${bodyBackgroundSrc})`;
  document.body.appendChild(gameBoard);
}

main();
