class GameView {
  private game: Game;
  private contentEl: HTMLElement;
  private cellWidht: number;
  private zoom: number;
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
    this.zoom = 1;
    this.leftOffset = Math.floor((contentEl.getBoundingClientRect().width - game.size * this.cellWidht) / 2);
  }

  private clearBoard = () => {
    this.contentEl.innerHTML = "";
  };

  private drawCell = (i: number, j: number) => {
    const cell = this.game.playground[i][j];
    const e = document.createElement("div");
    e.className = "cell " + cell.status + " " + this.game.status;
    const actWidth = Math.floor(this.zoom * this.cellWidht);
    const actOffset = Math.max(0, this.leftOffset - Math.floor(((this.cellWidht * this.game.size) / 2) * (this.zoom - 1)));
    e.style.width = `${actWidth}px`;
    e.style.height = `${actWidth}px`;
    e.style.left = `${actOffset + actWidth * i}px`;
    e.style.top = `${this.topOffset + actWidth * j}px`;
    e.style.fontSize = `${Math.floor(actWidth * 0.8)}px`;
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

  private drawBtns = () => {
    const e = document.createElement("div");
    e.className = "bttn " + (this.game.setFlag ? "selected" : "");
    e.style.width = `${this.cellWidht}px`;
    e.style.height = `${this.cellWidht}px`;
    e.style.left = `${this.leftOffset + Math.floor((this.cellWidht * this.game.size) / 2)}px`;
    e.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    e.innerHTML = "&#9872;";
    e.onclick = () => {
      this.game.setFlag = !this.game.setFlag;
      this.draw();
    };
    this.contentEl.appendChild(e);

    const zoomIn = document.createElement("div");
    zoomIn.className = "bttn ";
    zoomIn.style.width = `${this.cellWidht}px`;
    zoomIn.style.height = `${this.cellWidht}px`;
    zoomIn.style.left = `${this.leftOffset + Math.floor((this.cellWidht * this.game.size) / 2) + this.cellWidht}px`;
    zoomIn.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    zoomIn.innerHTML = "+";
    zoomIn.onclick = () => {
      this.zoom *= 1.2;
      this.draw();
    };
    this.contentEl.appendChild(zoomIn);

    const zoomOut = document.createElement("div");
    zoomOut.className = "bttn ";
    zoomOut.style.width = `${this.cellWidht}px`;
    zoomOut.style.height = `${this.cellWidht}px`;
    zoomOut.style.left = `${this.leftOffset + Math.floor((this.cellWidht * this.game.size) / 2) - this.cellWidht}px`;
    zoomOut.style.fontSize = `${Math.floor(this.cellWidht * 0.8)}px`;
    zoomOut.innerHTML = "-";
    zoomOut.onclick = () => {
      this.zoom = Math.max(1, this.zoom / 1.2);
      this.draw();
    };
    this.contentEl.appendChild(zoomOut);
  };

  resetZoom = () => {
    this.zoom = 1;
    this.draw();
  };

  draw = () => {
    this.clearBoard();
    Array.from(Array(this.game.size).keys()).forEach((i) =>
      Array.from(Array(this.game.size).keys()).forEach((j) => this.drawCell(i, j))
    );
    this.drawBtns();
  };
}
