import "./ui/components/HomePage";
import "./ui/components/GameBoardDisplay";

import bodyBackgroundSrc from "./assets/images/body-background.jpg";

function main() {
  const homePage = document.createElement("home-page");
  document.body.style.backgroundImage = `url(${bodyBackgroundSrc})`;
  document.body.appendChild(homePage);
}

main();
