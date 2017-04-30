const readLineSync = require('readline-sync');

class TicTacToe {
  constructor() {
    this.row1 = '   |   |   \n'.split('');
    this.row2 = '   |   |   \n'.split('');
    this.row3 = '   |   |   \n'.split('');
    this.line = '-----------\n';
    this.count = 0;
    this.moves = [];

    this.rowHash = {
      '1': 'row1',
      '2': 'row2',
      '3': 'row3'
    };
    this.columnHash = {
      '1': 1,
      '2': 5,
      '3': 9
    };

    this.victoryConditions = [
      [['1', '1'], ['1', '2'], ['1', '3']],
      [['2', '1'], ['2', '2'], ['2', '3']],
      [['3', '1'], ['3', '2'], ['3', '3']],
      [['1', '1'], ['2', '1'], ['3', '1']],
      [['1', '2'], ['2', '2'], ['3', '2']],
      [['1', '3'], ['2', '3'], ['3', '3']],
      [['1', '1'], ['2', '2'], ['3', '3']],
      [['1', '3'], ['2', '2'], ['3', '1']]
    ];
  }

  startGame() {
    console.log('Let\'s begin playing Tic-Tac-Toe.');
    return console.log(this.showBoard());
  }

  showBoard() {
    return this.row1.join('') + this.line + this.row2.join('') + this.line + this.row3.join('');
  }

  changeMoves(nextMoveRow, nextMoveColumn) {
    this.moves.push([nextMoveRow, nextMoveColumn]);
    let rowToChange = this.rowHash[this.moves[this.moves.length-1][0]];
    let colToChange = this.columnHash[this.moves[this.moves.length-1][1]];
    this[rowToChange][colToChange] = this.count % 2 === 0 ? 'X' : 'O';
  }

  checkVictory(moves) {
    const OneMoves = moves.filter((move, index) => index % 2 === 0);
    const TwoMoves = moves.filter((move, index) => index % 2 === 1);

    if (this._checkVictory(OneMoves)) {
      return 'Player 1';
    } else if (this._checkVictory(TwoMoves)) {
      return 'Player 2';
    } else {
      return null
    }
  }

  _checkVictory(playerMoves) {
    return this.victoryConditions.reduce((result, condition) => {
      const victory = condition
          .map(move => playerMoves
            .reduce((acc, playerMove) => {
              if (JSON.stringify(move) === JSON.stringify(playerMove)) {
                acc = true;
              }
              return acc;
          }, false))
          .filter(meetsCondition => meetsCondition === true)
          .length === 3;
      return victory ? true : result;
    }, false);
  }

  playGame() {
    this.startGame();

    while (this.count < 9) {
      let nextMoveRow = readLineSync.question('What is your next move? Which row will you place your piece?\n');
      let nextMoveColumn = readLineSync.question('Which column?\n');

      let newMove = [nextMoveRow, nextMoveColumn];
      if (!JSON.stringify(this.moves).includes(JSON.stringify(newMove))) {
        this.changeMoves(nextMoveRow, nextMoveColumn);

        let winner = this.checkVictory(this.moves);
        if (winner) {
          return console.log(winner, ' wins!');
        } else {
          this.count += 1;
          console.log(this.showBoard());
        }
      } else {
        console.log('Sorry, this piece has already been filled.');
      }
    }
    return console.log('It\'s a tie!');
  }
}

let ticTacToe = new TicTacToe();
ticTacToe.playGame();