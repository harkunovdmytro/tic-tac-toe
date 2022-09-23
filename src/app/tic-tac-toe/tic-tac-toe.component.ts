import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NicknameDialogComponent} from "../nickname-dialog-component/nickname-dialog.component";

export interface Player {
  name: string;
  wins: number;
}

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  game = 0;
  currentWinner = '';

  players: Player[] = [
    {
      name: 'Player 1',
      wins: 0,
    },
    {
      name: 'Player 2',
      wins: 0,
    },
  ]


  isDraw = false;
  squares!: { value: string | null, disable: boolean }[];
  xIsNext!: boolean;
  winner!: string | null;
  // mycode
  winsVaiants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  checkWinsVariants = () => {
    const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const currentValues = this.squares.map((square, index) => ({
      index,
      value: square.value
    }))

    const whoIsNowHaveTurn = currentValues.filter(({value}) =>
      this.xIsNext ? value === 'x' : value === 'o').map(player => player.index)

    const lastCells = currentValues.filter(item => item.value === null).map(item => item.index) /// 3, 4, 5
    const allCurrentVariants = whoIsNowHaveTurn.concat(lastCells)
    const isEnd = !this.winsVaiants.some(variant => variant.every(v => allCurrentVariants.includes(v)))
    console.log(isEnd)
    return isEnd;
  }


  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newGame();
    // this.players.forEach(player => this.openDialog(player));
    this.openDialog({name: '1', wins: 0});
    this.openDialog({name: '2', wins: 0});
  };


  newGame(): void {
    this.squares = Array(9).fill({value: null, disable: false});
    this.winner = null;
    this.xIsNext = true;
    this.currentWinner = '';
  }

  onTouch(index: number): void {
    if (!this.squares[index].value) {
      this.squares.splice(index, 1, this.xIsNext ? {value: 'x', disable: true} : {value: 'o', disable: true});
      // check variant of wins
      this.xIsNext = !this.xIsNext;
    }

    this.isDraw = this.calculateDraw();
    if (this.isDraw) {
      console.log('DRAW!');
    }

    this.winner = this.calculateWinner();

    if (this.winner) {
      this.game++;
      this.currentWinner = this.winner;

      this.squares.forEach(square => square.disable = true);

      if (this.winner === 'x') {
        if (this.game % 2) {
          this.currentWinner = this.players[0].name;
          this.players[0].wins++;
        } else {
          this.currentWinner = this.players[1].name
          this.players[1].wins++;
        }
      } else {
        if (this.game % 2) {
          this.currentWinner = this.players[1].name;
          this.players[1].wins++;
        } else {
          this.currentWinner = this.players[0].name
          this.players[0].wins++;
        }
      }
    }
  }

  calculateWinner(): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.checkWinsVariants()) {
        return this.squares[a].value;
      }
      if (
        this.squares[a].value
        && this.squares[a].value === this.squares[b].value
        && this.squares[a].value === this.squares[c].value) {
        return this.squares[a].value;
      }
    }
    return null;
  }

  calculateDraw(): boolean {
    return this.squares.every(sell => sell.disable);
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // for (let i = 0; i < lines.length; i++) {
    //   const [a, b, c] = lines[i];
    //   if (this.squares[a].disable && this.squares[b].disable && this.squares[c].disable) {
    //     return true;
    //   }
    // }
    return lines.some(([a,b,c])=>this.squares[a].disable && this.squares[b].disable && this.squares[c].disable)
    // return false;
  }

  // dialog window

  openDialog(player: Player): void {
    const dialogRef = this.dialog.open(NicknameDialogComponent, {
      data: 'player',
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      player.name = result;
    })
  }

  get getCurrentPlayer() {
    if (this.winner === 'x') {
      if (this.game % 2) {
        return this.xIsNext ? true : false;
      } else {
        return this.xIsNext ? false : true;
      }
    } else {
      if (this.game % 2) {
        return this.xIsNext ? false : true;
      } else {
        return this.xIsNext ? true : false;
      }
    }
  }
}
