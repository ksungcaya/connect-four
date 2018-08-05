/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import Game from '../../src/listeners/Game';
import Player from '../../src/libs/Player';
import { socket, io } from './socket.stubs';

chai.use(sinonChai);

describe('GameTest', () => {
  const gameId = 'game-id';
  const player = new Player('p1', 'red');
  const readyPlayers = {};
  readyPlayers[player.getId()] = player;

  const listener = new Game({}, io, socket);
  let handlers;

  before(() => {
    handlers = listener.get();
  });

  afterEach(() => {
    io.emit.resetHistory();
    io.in.resetHistory();

    socket.join.resetHistory();
    socket.broadcast.to.resetHistory();
    socket.broadcast.emit.resetHistory();
  });

  it('returns the events with method handlers', () => {
    expect(handlers).to.have.all.keys([
      'join-game',
      'player-assign',
      'player-ready',
      'all-ready',
      'turn-over',
      'player-won',
      'game-draw',
      'player-left',
    ]);
  });

  it('handles joining of game', () => {
    handlers['join-game'](gameId);
    expect(socket.join).to.be.calledOnceWith(gameId);
    expect(socket.broadcast.to).to.be.calledOnceWith(gameId);
    expect(socket.broadcast.emit).to.be.calledOnceWith('joinGame');
  });

  it('handles player assign event', () => {
    handlers['player-assign'](gameId, player);

    expect(socket.broadcast.to).to.be.calledOnceWith(gameId);
    expect(socket.broadcast.emit).to.be.calledOnceWith('playerAssigned', player);
  });

  it('handles player ready event', () => {
    handlers['player-ready'](gameId, player);

    expect(socket.broadcast.to).to.be.calledOnceWith(gameId);
    expect(socket.broadcast.emit).to.be.calledOnceWith('otherPlayerReady', player);
  });

  it('handles all-players ready event', () => {
    handlers['all-ready'](gameId, readyPlayers);

    expect(socket.broadcast.to).to.be.calledOnceWith(gameId);
    expect(socket.broadcast.emit).to.be.calledOnceWith('playerTurn', player, 0);
    expect(io.in).to.be.calledOnceWith(gameId);
    expect(io.emit).to.be.calledOnceWith('changeTurn', player);
  });

  describe('turn-over', () => {
    const player2 = new Player('p2', 'yellow');

    before(() => {
      readyPlayers[player2.getId()] = player2;
    });

    it('handles next player\'s turn', () => {
      handlers['turn-over'](gameId, 1, player, 0, readyPlayers);

      expect(socket.broadcast.to).to.be.calledOnceWith(gameId);
      expect(socket.broadcast.emit).to.be.calledOnceWith('playerTurn', player2, 1, player, 1);
      expect(io.in).to.be.calledOnceWith(gameId);
      expect(io.emit).to.be.calledOnceWith('changeTurn', player2);
    });

    it('switches to the first player if all players finished their turn', () => {
      handlers['turn-over'](gameId, 2, player2, 1, readyPlayers);

      expect(socket.broadcast.to).to.be.calledOnceWith(gameId);
      expect(socket.broadcast.emit).to.be.calledOnceWith('playerTurn', player, 0, player2, 2);
      expect(io.in).to.be.calledOnceWith(gameId);
      expect(io.emit).to.be.calledOnceWith('changeTurn', player);
    });
  });

  it('handles winner event', () => {
    handlers['player-won'](gameId, player);
    expect(io.in).to.be.calledOnceWith(gameId);
    expect(io.emit).to.be.calledOnceWith('playerWon', player);
  });

  it('handles game draw event', () => {
    handlers['game-draw'](gameId);

    expect(io.in).to.be.calledOnceWith(gameId);
    expect(io.emit).to.be.calledOnceWith('gameDraw');
  });

  it('handles leaving player event', () => {
    handlers['player-left'](gameId, player);

    expect(socket.broadcast.to).to.be.calledOnceWith(gameId);
    expect(socket.broadcast.emit).to.be.calledOnceWith('playerDisconnected', player);
  });
});
