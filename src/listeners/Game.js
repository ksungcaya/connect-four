class Game {
  /**
   * @param {Object} events
   * @param {Object} io
   * @param {Object} socket
   */
  constructor(events, io, socket) {
    this._events = events;
    this._io = io;
    this._socket = socket;
  }

  /**
   * Get the game events and associated handler methods.
   *
   * @returns {Object}
   */
  get() {
    return {
      'join-game': this._onJoin.bind(this),
      'player-assign': this._onPlayerAssign.bind(this),
      'player-ready': this._onPlayerReady.bind(this),
      'all-ready': this._onAllPlayersReady.bind(this),
      'turn-over': this._onTurnOver.bind(this),
      'player-won': this._onPlayerWon.bind(this),
      'game-draw': this._onGameDraw.bind(this),
      'player-left': this._onPlayerLeft.bind(this),
    };
  }

  /**
   * Handle join game.
   *
   * @param {String} game
   */
  _onJoin(game) {
    this._socket.join(game);
    this._socket.broadcast.to(game).emit('joinGame');
  }

  /**
   * Handle player assign.
   *
   * @param {String} game
   * @param {Object} player
   */
  _onPlayerAssign(game, player) {
    this._socket.broadcast.to(game).emit('playerAssigned', player);
  }

  /**
   * Handle player ready.
   *
   * @param {String} game
   * @param {Object} player
   */
  _onPlayerReady(game, player) {
    this._socket.broadcast.to(game).emit('otherPlayerReady', player);
  }

  /**
   * Handle all players ready.
   *
   * @param {String} game
   * @param {Object} readyPlayers
   */
  _onAllPlayersReady(game, readyPlayers) {
    const players = Object.values(readyPlayers);

    this._socket.broadcast.to(game).emit('playerTurn', players[0], 0);
    this._io.in(game).emit('changeTurn', players[0]);
  }

  /**
   * Handle end of turn.
   *
   * @param {String} game
   * @param {Integer} col
   * @param {Object} lastPlayer
   * @param {Integer} lastIndex
   * @param {Object} readyPlayers
   */
  _onTurnOver(game, col, lastPlayer, lastIndex, readyPlayers) {
    const players = Object.values(readyPlayers);
    let newIndex = lastIndex + 1;

    if (players[newIndex] === undefined) {
      newIndex = 0;
    }

    const newPlayer = players[newIndex];

    this._socket.broadcast.to(game).emit('playerTurn', newPlayer, newIndex, lastPlayer, col);
    this._io.in(game).emit('changeTurn', newPlayer); // update turn status
  }

  /**
   * Handle winner.
   *
   * @param {String} game
   * @param {Object} winner
   */
  _onPlayerWon(game, winner) {
    this._io.in(game).emit('playerWon', winner);
  }

  /**
   * Handle game draw.
   *
   * @param {String} game
   */
  _onGameDraw(game) {
    this._io.in(game).emit('gameDraw');
  }

  /**
   * Handle leaving player.
   *
   * @param {String} game
   * @param {Object} player
   */
  _onPlayerLeft(game, player) {
    this._socket.broadcast.to(game).emit('playerDisconnected', player);
  }
}

export default Game;
