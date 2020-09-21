class GameView {
  private game: Game;
  private contentEl: HTMLElement;
  private cellWidht: number;
  private leftOffset: number;
  private topOffset: number;

  constructor(contentEl: HTMLElement, game: Game) {
    this.contentEl = contentEl;
    this.game = game;
    this.topOffset = 32;
    this.cellWidht = Math.floor(
      (Math.min(contentEl.getBoundingClientRect().width, contentEl.getBoundingClientRect().height) * 0.8 - 16) / game.size
    );
    this.leftOffset = Math.floor((contentEl.getBoundingClientRect().width - game.size * this.cellWidht) / 2);
  }

  private clearBoard = () => {
    this.contentEl.innerHTML = "";
  };

  private drawCell = (i: number, j: number) => {
    const e = document.createElement("div");
    e.className = "cell " + this.game.playground[i][j].status;
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + this.cellWidht * i}px`;
    e.style.top = `${this.topOffset + this.cellWidht * j}px`;
    e.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    e.innerHTML =
      this.game.playground[i][j].status === "hidden"
        ? ""
        : this.game.playground[i][j].status === "falg" || this.game.playground[i][j].status === "mineFlag"
        ? "&#9872;"
        : this.game.playground[i][j].status === "visible" && this.game.playground[i][j].value > 0
        ? this.game.playground[i][j].value.toString()
        : "";
    e.onclick = () => this.game.clickEvent(i, j);
    this.contentEl.appendChild(e);
  };

  private drawBtn = () => {
    const e = document.createElement("div");
    e.className = "btn " + (this.game.setFlag ? "selected" : "");
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
