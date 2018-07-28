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
  const board = new Board();
  const game = new Game(board);
  const player1 = new Player('red');
  const stubs = {};

  afterEach(() => _.forEach(stubs, stub => stub.restore()));

  it('allows player to occupy a column', () => {
    stubs.drop = sinon.stub(board, 'drop');

    game.move(player1, 1);

    expect(stubs.drop).to.have.been.calledWith(player1, 1);
  });
});
