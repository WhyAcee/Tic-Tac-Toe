/* eslint-disable no-unused-vars */

// Player Factory function
const player = (name, marker) => ({ name, marker });

// Game board module
const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const makeMove = (index, marker) => {
    board[index] = marker;

    console.log('gameBoard module loaded');

    const checkWinner = () => {
    // check for winning combinations and return the winner's symbol
    // or null if there is no winner
    };

    return { makeMove, checkWinner };
  };
  return { makeMove };
})();

// Main code
const cells = document.querySelectorAll('.cell');
console.log(cells);
const player1 = player('Player 1', 'X');
const player2 = player('Player 2', 'O');
let currentPlayer = player1;

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.textContent !== '') {
      // do nothing if cell is occupied
      return;
    }

    gameBoard.makeMove(index, currentPlayer.marker);

    cell.textContent = currentPlayer.marker;

    const winner = gameBoard.checkWinner;

    if (winner) {
      // display winner
    } else {
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
    console.log(cells);
  });
});
