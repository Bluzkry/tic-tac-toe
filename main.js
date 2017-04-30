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
    return console.log(this.makeBoard());
  }

  makeBoard() {
    return this.row1.join('') + this.line + this.row2.join('') + this.line + this.row3.join('');
  }

  makeMove(nextMoveRow, nextMoveColumn) {
    const newMove = [nextMoveRow, nextMoveColumn];
    if (!JSON.stringify(this.moves).includes(JSON.stringify(newMove))) {
      this.moves.push([nextMoveRow, nextMoveColumn]);

      let rowToChange = this.rowHash[this.moves[this.moves.length - 1][0]];
      let colToChange = this.columnHash[this.moves[this.moves.length - 1][1]];

      this[rowToChange][colToChange] = this.count % 2 === 0 ? 'X' : 'O';

      this.count += 1;
    } else {
      return console.log('This piece has already been played.')
    }
  }

  checkVictory() {
    const OneMoves = this.moves.filter((move, index) => index % 2 === 0);
    const TwoMoves = this.moves.filter((move, index) => index % 2 === 1);

    if (this._checkVictory(OneMoves)) {
      return 'Player 1';
    } else if (this._checkVictory(TwoMoves)) {
      return 'Player 2';
    } else {
      return null;
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

      this.makeMove(nextMoveRow, nextMoveColumn);

      let winner = this.checkVictory();
      if (winner) {
        console.log(winner, ' wins!\n', this.makeBoard());
      } else {
        console.log(this.makeBoard());
      }
    }
    return console.log('It\'s a tie!');
  }
}

let ticTacToe = new TicTacToe();
ticTacToe.playGame();

module.exports = TicTacToe;