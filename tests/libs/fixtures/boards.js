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


export {
  player1,
  player2,
  p1VerticalWinner,
  noVerticalWinner,
};

export default {};
