# tic-tac-toe
This is a simple tic-tac-toe game, which can be played on the console. Written with tests.

**How to play the game:**
0) If you do not have npm or node, please install these on your computer. There are a plethora of useful and informative tutorials about npm and node which can be found about through Google or Youtube (these are often arguably clearer than the official documentation).
1) Go to the root directory of this game.
2) Open your command line and run: \
`npm install`\
`node main.js`

**How to run tests:** 
0) If you have not already run `npm install`, please do so.
1) Go to the root directory of this game.
2) Comment out `ticTacToe.playGame();` on the third-to-last line of `main.js`. \
If you don't comment out these lines, running step three will actually start the game on your console. \
The last lines of `main.js` should therefore be:
``` sh
let ticTacToe = new TicTacToe();
// ticTacToe.playGame();

module.exports = TicTacToe;`
```
3) Open your command line and run: \
`npm test`