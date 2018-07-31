import WinnerValidator from './WinnerValidator';

class Game {
  /**
   * Game constructor.
   *
   * @param {Board} board
   */
  constructor(board) {
    this._board = board;
    this.validate = new WinnerValidator(this._board);
    this.winner = null;
  }

  /**
   * Drop a coin.
   *
   * @param {Player} player
   * @param {Integer} column
   */
  move(player, column) {
    return this._board.drop(player, column);
  }

  /**
   * Get the current player occupying the board cell.
   *
   * @param {Integer} column
   * @param {Integer} row
   */
  cellPlayer(column, row) {
    return this._board.cellPlayer(column, row);
  }

  /**
   * Determine if the game is a draw
   * if there are no more available cells.
   *
   * @returns {Boolean}
   */
  isDraw() {
    return this._board.availableCells() === 0;
  }

  /**
   * Check if the player won the game.
   *
   * @param {Player} player
   *
   * @returns {Boolean}
   */
  hasWonBy(player) {
    switch (true) {
      case this.validate.vertically(player) === true:
        return this._setWinner(player);

      case this.validate.horizontally(player) === true:
        return this._setWinner(player);

      case this.validate.diagonally(player) === true:
        return this._setWinner(player);

      default:
        return false;
    }
  }

  /**
   * Get the game winner.
   *
   * @returns {Player}
   */
  getWinner() {
    return this.winner;
  }

  /**
   * Set the game winner.
   *
   * @param {Player} player
   *
   * @returns {Boolean}
   */
  _setWinner(player) {
    this.winner = player;

    return true;
  }
}

export default Game;
