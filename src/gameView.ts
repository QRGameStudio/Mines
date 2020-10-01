class GameView {
  private game: Game;
  private contentEl: HTMLElement;
  private cellWidht: number;
  private leftOffset: number;
  private topOffset: number;
  private colors = ["black", "blue", "green", "red", "darkblue", "brown", "pink", "yellow", "black", "orange"];

  constructor(contentEl: HTMLElement, game: Game) {
    this.contentEl = contentEl;
    this.game = game;
    this.topOffset = 32;
    this.cellWidht = Math.floor(
      (Math.min(contentEl.getBoundingClientRect().width, contentEl.getBoundingClientRect().height) * 0.9 - 16) / game.size
    );
    this.leftOffset = Math.floor((contentEl.getBoundingClientRect().width - game.size * this.cellWidht) / 2);
  }

  private clearBoard = () => {
    this.contentEl.innerHTML = "";
  };

  private drawCell = (i: number, j: number) => {
    const cell = this.game.playground[i][j];
    const e = document.createElement("div");
    e.className = "cell " + cell.status + " " + this.game.status;
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + this.cellWidht * i}px`;
    e.style.top = `${this.topOffset + this.cellWidht * j}px`;
    e.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    e.innerHTML =
      cell.status === "hidden"
        ? ""
        : cell.status === "flag" || cell.status === "mineFlag"
        ? "&#9872;"
        : cell.status === "visible" && cell.value > 0
        ? cell.value.toString()
        : "";
    if (cell.status === "visible") e.style.color = this.colors[cell.value];
    e.onclick = () => this.game.clickEvent(i, j);
    this.contentEl.appendChild(e);
  };

  private drawBtn = () => {
    const e = document.createElement("div");
    e.className = "bttn " + (this.game.setFlag ? "selected" : "");
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + Math.floor((this.cellWidht * this.game.size) / 2)}px`;
    e.style.top = `${2 * this.topOffset + this.cellWidht * this.game.size}px`;
    e.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    e.innerHTML = "&#9872;";
    e.onclick = () => {
      this.game.setFlag = !this.game.setFlag;
      this.draw();
    };
    this.contentEl.appendChild(e);
  };

  draw = () => {
    this.clearBoard();
    Array.from(Array(this.game.size).keys()).forEach((i) =>
      Array.from(Array(this.game.size).keys()).forEach((j) => this.drawCell(i, j))
    );
    this.drawBtn();
  };
}
