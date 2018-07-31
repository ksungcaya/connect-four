import Board from '../../../src/libs/Board';
import Player from '../../../src/libs/Player';

const player1 = new Player('red');
const player2 = new Player('yellow');

// vertical winner
const p1VerticalWinner = new Board();

p1VerticalWinner.drop(player1, 1);
p1VerticalWinner.drop(player2, 1);
p1VerticalWinner.drop(player1, 1);
p1VerticalWinner.drop(player1, 1);
p1VerticalWinner.drop(player1, 1);
p1VerticalWinner.drop(player1, 1);

// no vertical winner
const noVerticalWinner = new Board();

noVerticalWinner.drop(player1, 1);
noVerticalWinner.drop(player2, 1);
noVerticalWinner.drop(player1, 1);
noVerticalWinner.drop(player1, 1);
noVerticalWinner.drop(player1, 1);
noVerticalWinner.drop(player2, 1);

// horizontal winner
const p2HorizontalWinner = new Board();
// Below will produce the following:
// 1 1 2 2 2 2 1
// 1 1 2 2 2 1 1
p2HorizontalWinner.drop(player1, 1);
p2HorizontalWinner.drop(player2, 3);
p2HorizontalWinner.drop(player1, 2);
p2HorizontalWinner.drop(player2, 4);
p2HorizontalWinner.drop(player1, 6);
p2HorizontalWinner.drop(player2, 5);
p2HorizontalWinner.drop(player1, 7);

p2HorizontalWinner.drop(player2, 4);
p2HorizontalWinner.drop(player1, 7);
p2HorizontalWinner.drop(player2, 3);
p2HorizontalWinner.drop(player1, 2);
p2HorizontalWinner.drop(player2, 5);
p2HorizontalWinner.drop(player1, 1);
p2HorizontalWinner.drop(player2, 6);

const p1RightDiagonalWinner = new Board();

// Output:
// 0 0 0 0 1 0 0
// 0 1 2 1 2 1 0
// 0 2 1 2 1 2 0
// 0 1 2 2 1 2 1
p1RightDiagonalWinner.drop(player1, 2);
p1RightDiagonalWinner.drop(player2, 3);
p1RightDiagonalWinner.drop(player1, 5);
p1RightDiagonalWinner.drop(player2, 4);
p1RightDiagonalWinner.drop(player1, 7);
p1RightDiagonalWinner.drop(player2, 6);

p1RightDiagonalWinner.drop(player1, 3);
p1RightDiagonalWinner.drop(player2, 2);
p1RightDiagonalWinner.drop(player1, 5);
p1RightDiagonalWinner.drop(player2, 4);

p1RightDiagonalWinner.drop(player1, 2);
p1RightDiagonalWinner.drop(player2, 6);
p1RightDiagonalWinner.drop(player1, 4);
p1RightDiagonalWinner.drop(player2, 3);
p1RightDiagonalWinner.drop(player1, 6);
p1RightDiagonalWinner.drop(player2, 5);

p1RightDiagonalWinner.drop(player1, 5);

const p2LeftDiagonalWinner = new Board();

// Output:
// 0 0 2 0 0 0 0
// 0 0 1 2 1 0 0
// 0 2 1 1 2 0 0
// 0 1 2 2 1 2 1
p2LeftDiagonalWinner.drop(player1, 2);
p2LeftDiagonalWinner.drop(player2, 3);
p2LeftDiagonalWinner.drop(player1, 5);
p2LeftDiagonalWinner.drop(player2, 4);
p2LeftDiagonalWinner.drop(player1, 7);
p2LeftDiagonalWinner.drop(player2, 6);

p2LeftDiagonalWinner.drop(player1, 3);
p2LeftDiagonalWinner.drop(player2, 5);
p2LeftDiagonalWinner.drop(player1, 4);
p2LeftDiagonalWinner.drop(player2, 2);

p2LeftDiagonalWinner.drop(player1, 3);
p2LeftDiagonalWinner.drop(player2, 4);
p2LeftDiagonalWinner.drop(player1, 5);

p2LeftDiagonalWinner.drop(player2, 3);

// Recreate the scenario where the
// having 5 matches is not a winner.
// Output:
// 0 0 2 2 2 0 2
// 0 0 1 1 1 1 1
const p1HorizontalRegression = new Board();
p1HorizontalRegression.drop(player1, 7);
p1HorizontalRegression.drop(player2, 7);

p1HorizontalRegression.drop(player1, 3);
p1HorizontalRegression.drop(player2, 3);

p1HorizontalRegression.drop(player1, 4);
p1HorizontalRegression.drop(player2, 4);

p1HorizontalRegression.drop(player1, 5);
p1HorizontalRegression.drop(player2, 5);

p1HorizontalRegression.drop(player1, 6);


export {
  player1,
  player2,
  p1VerticalWinner,
  noVerticalWinner,
  p2HorizontalWinner,
  p1RightDiagonalWinner,
  p2LeftDiagonalWinner,
  p1HorizontalRegression,
};

export default {};
