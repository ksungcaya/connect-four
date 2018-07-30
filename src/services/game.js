import shortid from 'shortid';
import db from './db';

const GAMES_TABLE = 'games';
const PLAYERS_TABLE = 'players';

class Game {
  constructor() {
    this._db = db;
  }

  /**
   * Get all available games.
   */
  get() {
    return this._db.get(GAMES_TABLE).value();
  }

  /**
   * Create new game in the db.
   *
   * @param {Object} data
   *
   * @returns {Object}
   */
  create(data) {
    const { name, cols, rows } = data;
    const payload = {
      id: shortid.generate(),
      name,
      cols,
      rows,
    };

    this._db.get(GAMES_TABLE).push(payload).write();

    const players = this._createPlayers(data.colors, payload.id);

    return Object.assign({ players }, payload);
  }

  /**
   * Create player records of the game.
   *
   * @param {Array} colors
   * @param {String} game
   *
   * @returns {Array}
   */
  _createPlayers(colors, game) {
    const players = [];

    for (let i = 0; i < colors.length; i += 1) {
      const color = colors[i];
      const player = {
        id: shortid.generate(),
        color,
        game,
        taken: false,
      };
      this._db.get(PLAYERS_TABLE).push(player).write();
      players.push(player);
    }

    return players;
  }

  /**
   * Get game data by id.
   *
   * @param {Integer} id
   *
   * @returns {Object}
   */
  find(id) {
    const game = this._db.get(GAMES_TABLE).find({ id }).value();

    if (game) {
      const players = this._db.get(PLAYERS_TABLE).filter({ game: id }).value();

      return Object.assign({ players }, game);
    }

    return game;
  }
}

export default Game;
