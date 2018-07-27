/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import Board from '../../src/libs/Board';
import Player from '../../src/libs/Player';

describe('BoardTest', () => {
  const board = new Board();
  const player1 = new Player('red');
  const player2 = new Player('yellow');

  it('initializes default cells', () => {
    expect(board.columns).to.equals(7);
    expect(board.rows).to.equals(6);
  });

  describe('#drop', () => {
    it('assigns the player to the cell it dropped', () => {
      board.drop(player1, 2);
      board.drop(player2, 2);

      expect(player1).to.be.deep.equal(board.cellPlayer(2, 1));
      expect(player2).to.be.deep.equal(board.cellPlayer(2, 2));
    });

    it('throws an error if all rows of the column were occupied', () => {
      board.drop(player1, 3);
      board.drop(player2, 3);
      board.drop(player1, 3);
      board.drop(player2, 3);
      board.drop(player1, 3);
      board.drop(player2, 3);

      // this will throw an error
      expect(board.drop.bind(board, player1, 3)).to.throw();
    });

    it('gets count of unoccupied cells', () => {
      const smallBoard = new Board(1, 1);
      smallBoard.drop(player1, 1);

      expect(smallBoard.availableCells()).to.be.equals(0);
    });

    it('gets recenlty occupied cell', () => {
      board.drop(player1, 4);

      expect(board.getLastCell()).to.deep.equal({ row: 1, column: 4, player: player1 });
    });
  });
});
