/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import _ from 'lodash';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import Board from '../../src/libs/Board';
import Game from '../../src/libs/Game';
import Player from '../../src/libs/Player';

chai.use(sinonChai);

describe('GameTest', () => {
  const board = new Board(1, 2);
  const game = new Game(board, 'some-id');
  const player1 = new Player('red');
  const stubs = {};

  afterEach(() => _.forEach(stubs, stub => stub.restore()));

  it('allows player to occupy a column', () => {
    stubs.drop = sinon.stub(board, 'drop');

    game.move(player1, 1);

    expect(stubs.drop).to.have.been.calledWith(player1, 1);
  });

  it('returns the id of the game', () => {
    expect(game.id()).to.be.equal('some-id');
  });

  it('returns board columns count', () => {
    expect(game.columnCount()).to.be.equal(1);
  });

  it('returns board rows count', () => {
    expect(game.rowCount()).to.be.equal(2);
  });

  it('gets the player currently occupying the cell', () => {
    stubs.cellPlayer = sinon.stub(board, 'cellPlayer');

    game.cellPlayer(1, 2);

    expect(stubs.cellPlayer).to.have.been.calledWith(1, 2);
  });

  it('determines the game if it is a draw', () => {
    stubs.availableCells = sinon.stub(board, 'availableCells');

    stubs.availableCells.returns(0);
    expect(game.isDraw()).to.be.true;

    stubs.availableCells.returns(1);
    expect(game.isDraw()).to.be.false;
  });

  describe('#hasWonBy', () => {
    let validateWinnerWith;

    beforeEach(() => {
      stubs.horizontally = sinon.stub(game.validate, 'horizontally');
      stubs.vertically = sinon.stub(game.validate, 'vertically');
      stubs.diagonally = sinon.stub(game.validate, 'diagonally');

      validateWinnerWith = (horizontally, vertically, diagonally) => {
        stubs.horizontally.returns(horizontally);
        stubs.vertically.returns(vertically);
        stubs.diagonally.returns(diagonally);
      };
    });

    it('returns true if the player won vertically', () => {
      validateWinnerWith(false, true, false);

      expect(game.hasWonBy(player1)).to.be.true;
      expect(game.getWinner()).to.be.equal(player1);
    });

    it('returns true if the player won horizontally', () => {
      validateWinnerWith(true, false, false);

      expect(game.hasWonBy(player1)).to.be.true;
      expect(game.getWinner()).to.be.equal(player1);
    });

    it('returns true if the player won diagonally', () => {
      validateWinnerWith(false, false, true);

      expect(game.hasWonBy(player1)).to.be.true;
      expect(game.getWinner()).to.be.equal(player1);
    });
  });
});
