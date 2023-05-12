/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

// Player Factory function
const player = (name, marker) => ({ name, marker });

// Game board module
const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const checkWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const makeMove = (index, marker) => {
    board[index] = marker;

    return { makeMove };
  };

  // iterate over each winning combination in array then
  // check whether all the indexes in that combination are occupied
  // by the player's marker.
  const checkWin = (player) => checkWinner.some(
    (winningCombo) => winningCombo.every(
      (index) => board[index] === player.marker,
    ),
  );

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  const getBoard = () => [...board];

  return {
    makeMove, checkWin, resetBoard, getBoard,
  };
})();

// Variables
const playBtn = document.querySelector('.play');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const player1 = player('Player 1', 'X');
const player2 = player('Player 2', '0');
let currentPlayer = player1;

// event listener for each cell
const handleCellClick = (event) => {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (cell.textContent !== '') {
    // do nothing if cell is occupied
    return;
  }

  // make the move on the gameboard and update the cell with the player's marker
  gameBoard.makeMove(index, currentPlayer.marker);

  cell.textContent = currentPlayer.marker;
  cell.classList = `cell ${currentPlayer.marker}`;

  // check if the current player has won
  const winner = gameBoard.checkWin(currentPlayer);

  // check if the board is full
  const boardFull = gameBoard.getBoard().every((cell) => cell !== '');

  // if there is a winner, display a message and remove the event listener from all cells
  if (winner) {
    message.textContent = `${currentPlayer.name} Wins!`;
    cells.forEach((cell) => {
      cell.removeEventListener('click', handleCellClick);
    });
  } else if (boardFull) {
    message.textContent = 'This game is a draw!';
    cells.forEach((cell) => {
      cell.removeEventListener('click', handleCellClick);
    });
  } else {
    // switch to the other player's turn
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    message.textContent = `${currentPlayer.name}'s Turn`;
  }
};

// Main code
const game = () => {
  message.textContent = `${currentPlayer.name}'s Turn`;

  console.log(cells);

  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });
};

// Button to start/restart game
playBtn.addEventListener('click', () => {
  if (playBtn.textContent === 'PLAY') {
    game();
    console.log('play game');
    playBtn.textContent = 'Reset';
  } else {
    gameBoard.resetBoard();
    cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList = 'cell';
      message.textContent = 'Click PLAY to Start!';
      cell.removeEventListener('click', handleCellClick);
      currentPlayer = player1;
    });
    playBtn.textContent = 'PLAY';
  }
});
