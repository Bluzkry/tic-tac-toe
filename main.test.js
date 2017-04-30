const {expect} = require('chai');
const sinon = require('sinon');
const TicTacToe = require('./main');

describe('tic-tac-toe', () => {
  let ticTacToe;
  beforeEach(() => {
    ticTacToe = new TicTacToe();
  });
  it ('correctly portrays a board', () => {
    let board = ticTacToe.makeBoard();
    let boardParts = board.split('\n');

    boardParts.forEach((part, index) => {
      if (index % 2 === 0) {
        expect(part).to.equal('   |   |   ');
      } else if (index === 1 || index === 3) {
        expect(part).to.equal('-----------');
      }
    });

    expect(boardParts).to.have.lengthOf(6);
  });

  it('correctly changes rows and columns when a move is made', () => {
    const expectedRow1 = [ ' ', 'X', ' ', '|', ' ', ' ', ' ', '|', ' ', ' ', ' ', '\n' ];
    ticTacToe.makeMove('1', '1');
    expect(ticTacToe.row1).to.eql(expectedRow1);
  });

  it('increments the count when a move is made', () => {
    ticTacToe.makeMove('1', '1');
    expect(ticTacToe.count).to.equal(1);
  });

  it('remembers moves that were previously made', () => {
    const expectedMoves = [['1', '1']];
    ticTacToe.makeMove('1', '1');
    expect(ticTacToe.moves).to.eql(expectedMoves);
  });

  it('alternates between X and O for different moves', () => {
    ticTacToe.makeMove('1', '1');
    ticTacToe.makeMove('2', '2');
    ticTacToe.makeMove('3', '3');
    ticTacToe.makeMove('1', '2');

    let board = ticTacToe.makeBoard();

    expect(board).to.include('X');
    expect(board.split('X')).to.have.length.of(3);
    expect(board).to.include('O');
    expect(board.split('O')).to.have.length.of(3);
  });

  it('makes no changes if the move was already selected, ', () => {
    const expectedRow1 = [ ' ', 'X', ' ', '|', ' ', ' ', ' ', '|', ' ', ' ', ' ', '\n' ];
    const expectedMoves = [['1', '1']];

    ticTacToe.makeMove('1', '1');
    ticTacToe.makeMove('1', '1');

    expect(ticTacToe.row1 ).to.eql(expectedRow1);
    expect(ticTacToe.moves).to.eql(expectedMoves);
    expect(ticTacToe.count).to.eql(1);
  });

  it('continues play afterwards, if the move was already selected, ', () => {
    const expectedRow1 = [ ' ', 'X', ' ', '|', ' ', ' ', ' ', '|', ' ', ' ', ' ', '\n' ];
    const expectedRow2 = [ ' ', ' ', ' ', '|', ' ', 'O', ' ', '|', ' ', ' ', ' ', '\n' ];
    const expectedMoves = [['1', '1'], ['2', '2']];

    ticTacToe.makeMove('1', '1');
    ticTacToe.makeMove('1', '1');
    ticTacToe.makeMove('2', '2');

    expect(ticTacToe.row1 ).to.eql(expectedRow1);
    expect(ticTacToe.row2 ).to.eql(expectedRow2);
    expect(ticTacToe.moves).to.eql(expectedMoves);
    expect(ticTacToe.count).to.eql(2);
  });

  it('finds victories for the correct person for rows', () => {
    ticTacToe.makeMove('1', '1');
    ticTacToe.makeMove('2', '1');
    ticTacToe.makeMove('1', '3');
    ticTacToe.makeMove('2', '2');
    ticTacToe.makeMove('1', '2');

    expect(ticTacToe.checkVictory()).to.equal('Player 1');
  });

  it('finds victories for the correct person for columns', () => {
    ticTacToe.makeMove('1', '1');
    ticTacToe.makeMove('3', '3');
    ticTacToe.makeMove('1', '2');
    ticTacToe.makeMove('2', '3');
    ticTacToe.makeMove('2', '1');
    ticTacToe.makeMove('1', '3');

    expect(ticTacToe.checkVictory()).to.equal('Player 2');
  });

  it('finds victories for the correct person for diagonals', () => {
    ticTacToe.makeMove('1', '1');
    ticTacToe.makeMove('3', '2');
    ticTacToe.makeMove('2', '2');
    ticTacToe.makeMove('2', '3');
    ticTacToe.makeMove('3', '3');

    expect(ticTacToe.checkVictory()).to.equal('Player 1');
  });

  it('ties the game when the board is full', () => {
    let consoleLog = sinon.spy(console, 'log');

    ticTacToe.makeMove('1', '1');
    ticTacToe.makeMove('1', '2');
    ticTacToe.makeMove('1', '3');
    ticTacToe.makeMove('2', '1');
    ticTacToe.makeMove('2', '2');
    ticTacToe.makeMove('2', '3');
    ticTacToe.makeMove('3', '1');
    ticTacToe.makeMove('3', '2');
    ticTacToe.makeMove('3', '3');

    let game = ticTacToe.playGame();
    expect(consoleLog.calledWith('It\'s a tie!')).to.be.true;
  });

});