/// <reference path="./game.ts" />

const init = () => {
  const content = document.getElementById("game-content");
  content.innerHTML = "";
  new Game(content, 16, 40, () => {
    const e = document.createElement("div");
    e.className = "gameOver";
    e.onclick = init;
    content.appendChild(e);
  });
};

window.onload = init;
