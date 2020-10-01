/// <reference path="./game.ts" />

const selectDifficulty = (content: HTMLElement) => {
  [{lbl: 'easy', size: 10, mines: 10}, {lbl: 'medium', size: 16, mines: 40}, {lbl: 'hard', size: 22, mines: 99}].forEach((dif,i) => {
    const e = document.createElement("div");
    e.className = "bttn ";
    e.style.width = `80vw`;
    e.style.height = `10vh`;
    e.style.left = `10vw`;
    e.style.top = `${10 + 12*i}vh`;
    e.style.fontSize = `${Math.floor(content.getBoundingClientRect().height * 0.05)}px`;
    e.innerHTML = dif.lbl;
    e.onclick = () => {
      content.innerHTML = ''
      startGame(dif.size, dif.mines, content);
    };
    content.appendChild(e);
  })
}

const startGame = (size:number, mines:number, content: HTMLElement) =>new Game(content, size, mines, () => {
  const e = document.createElement("div");
  e.className = "gameOver";
  e.onclick = init;
  content.appendChild(e);
});

const init = () => {
  // @ts-ignore
  new GTheme().apply();

  const content = document.getElementById("game-content");
  content.innerHTML = "";
  selectDifficulty(content);
};

window.onload = init;
