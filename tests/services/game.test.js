/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import db from './db.stub';
import Game from '../../src/services/game';

describe('GamesTest', () => {
  let game;
  let testGame;
  const data = {
    name: 'test',
    cols: 7,
    rows: 6,
    colors: ['red', 'yellow'],
  };

  before(() => {
    game = new Game();
    game._db = db;

    testGame = game.create(data);
  });

  after(() => {
    db.get('games').remove().write();
    db.get('players').remove().write();
  });

  it('creates game', () => {
    expect(testGame).to.have.property('name', data.name);
    expect(testGame).to.have.property('cols', data.cols);
    expect(testGame).to.have.property('rows', data.rows);
    expect(testGame).to.have.property('locked', false);
    expect(testGame).to.have.property('ended', false);
    expect(testGame).to.have.property('players');

    expect(testGame.players).to.have.lengthOf(2);
    expect(testGame.players[0]).to.have.property('game', testGame.id);
  });

  it('gets an array of games available', () => {
    const games = game.get();

    expect(games).to.be.an('array');
    expect(games).to.have.lengthOf(1);
  });

  it('gest the game data with the players', () => {
    const gameData = game.find(testGame.id);

    expect(gameData).to.have.property('name', data.name);
    expect(gameData).to.have.property('cols', data.cols);
    expect(gameData).to.have.property('rows', data.rows);
    expect(testGame).to.have.property('locked', false);
    expect(testGame).to.have.property('ended', false);
    expect(gameData).to.have.property('players');
    expect(gameData.players).to.have.lengthOf(2);
  });

  it('locks and unlocks a game', () => {
    const { id } = testGame;

    game.lock(id);
    expect(game.find(id)).to.have.property('locked', true);

    game.unlock(id);
    expect(game.find(id)).to.have.property('locked', false);
  });

  it('marks end of the game', () => {
    const { id } = testGame;

    game.end(id);

    expect(game.find(id)).to.have.property('ended', true);
    expect(game.get()).to.have.lengthOf(0);
  });
});
