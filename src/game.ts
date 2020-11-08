/// <reference path="./gameView.ts"/>

type fieldState = {
  status: "mine" | "visible" | "hidden" | "flag" | "mineFlag";
  value: number;
};

type gameStatus = "win" | "lost" | "running";

class Game {
  readonly playground: fieldState[][];
  readonly size: number;
  readonly mines: number;
  private gameView: GameView;
  private visibleCells: number;
  private gameOver: () => void;
  status: gameStatus;
  setFlag: boolean;

  constructor(contentEl: HTMLElement, size: number, mines: number, gameOver: () => void) {
    this.size = size;
    this.visibleCells = 0;
    this.status = "running";
    this.gameOver = gameOver;
    this.playground = [];
    for (let i = 0; i < size; i++) {
      this.playground.push([]);
      for (let j = 0; j < size; j++) this.playground[i].push({ status: "hidden", value: 0 } as fieldState);
    }
    this.mines = mines;
    this.setFlag = false;
    this.generateMines();
    this.fillCounts();
    this.gameView = new GameView(contentEl, this);
    this.gameView.draw();
  }

  private getNeighbours = (i: number, j: number) => {
    const res = [];
    [-1, 0, 1].forEach((iDiff) =>
      [-1, 0, 1].forEach((jDiff) => {
        if (iDiff === 0 && jDiff == 0) return;
        if (i + iDiff < 0 || i + iDiff >= this.size) return;
        if (j + jDiff < 0 || j + jDiff >= this.size) return;
        res.push([i + iDiff, j + jDiff]);
      })
    );
    return res;
  };

  private generateMines = () => {
    let minesLeft = this.mines;
    while (minesLeft > 0) {
      const i = Math.floor(Math.random() * this.size);
      const j = Math.floor(Math.random() * this.size);
      if (this.playground[i][j].status !== "mine") {
        this.playground[i][j].status = "mine";
        minesLeft--;
      }
    }
  };

  private fillCounts = () => {
    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++) {
        if (this.playground[i][j].status !== "mine")
          this.playground[i][j].value = this.getNeighbours(i, j).filter(
            (pos) => this.playground[pos[0]][pos[1]].status === "mine"
          ).length;
      }
  };

  clickEvent = (i: number, j: number, draw?: boolean) => {
    if (draw === undefined) draw = true;
    const cell = this.playground[i][j];
    if (cell.status === "hidden") {
      if (this.setFlag) cell.status = "flag";
      else {
        cell.status = "visible";
        this.visibleCells++;
        if (this.visibleCells + this.mines === this.size * this.size) {
          this.status = "win";
          alert("congratulations, you won!");
        }
        if (cell.value === 0) this.getNeighbours(i, j).forEach((pos) => this.clickEvent(pos[0], pos[1], false));
      }
    } else if (cell.status === "mine") {
      if (this.setFlag) cell.status = "mineFlag";
      else {
        this.status = "lost";
        alert("you died");
      }
    } else if (cell.status === "flag" && this.setFlag) cell.status = "hidden";
    else if (cell.status === "mineFlag" && this.setFlag) cell.status = "mine";

    if (draw) {
      this.gameView.draw();
      if (this.status !== "running") {
        this.gameView.resetZoom();
        this.gameOver();
      }
    }
  };
}
