/* eslint-disable no-unused-vars */

// Player Factory function
const player = (name, marker) => ({ name, marker });

// Game board module
const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

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
    console.log('gameBoard module loaded');

    return { makeMove };
  };
  // iterate over each winning combination in array
  const checkWin = (player) => checkWinner.some(
    (winningCombo) => winningCombo.every(
      (index) => board[index] === player.marker,
      // check whether all the indexes in that combination are occupied
      // by the player's marker.
    ),
  );

  return { makeMove, checkWin };
})();

// Main code
const game = () => {
  const cells = document.querySelectorAll('.cell');
  const message = document.querySelector('.message');
  const player1 = player('Player 1', 'X');
  const player2 = player('Player 2', '0');
  let currentPlayer = player1;

  console.log(cells);

  // event listener for each cell
  const handleCellClick = (event) => {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    console.log(Array.from(cells).indexOf(cell));

    if (cell.textContent !== '') {
      // do nothing if cell is occupied
      return;
    }

    gameBoard.makeMove(index, currentPlayer.marker);

    cell.textContent = currentPlayer.marker;
    cell.classList = `cell ${currentPlayer.marker}`;

    const winner = gameBoard.checkWin(currentPlayer);

    if (winner) {
      message.textContent = `${currentPlayer.name} Wins!`;
      cells.forEach((cell) => {
        cell.removeEventListener('click', handleCellClick);
      });
    } else {
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      message.textContent = `${currentPlayer.name}'s Turn`;
    }

    console.log(cells);
    console.log(currentPlayer);
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });
};

game();
