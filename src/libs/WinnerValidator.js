class WinnerValidator {
  /**
   * WinnerValidator constructor.
   *
   * @param {Board} board
   */
  constructor(board) {
    this.board = board;
  }

  /**
   * Going from top-most to lowest or vice-versa with the same player.
   *
   * @param {Object<Player>} player
   *
   * @returns {Boolean}
   */
  vertically(player) {
    const { row, column } = this.board.getLastCell();
    const startCell = this._getStartCell(player, { row, column }, { row: 1, column: 0 });

    return this._winnerPattern(player, startCell, { row: -1, column: 0 });
  }

  /**
   * Going from left-most to the right-most or vice-versa with the same player.
   *
   * @param {Object<Player>} player
   *
   * @returns {Boolean}
   */
  horizontally(player) {
    const { row, column } = this.board.getLastCell();
    const startCell = this._getStartCell(player, { row, column }, { row: 0, column: -1 });

    return this._winnerPattern(player, startCell, { row: 0, column: 1 });
  }

  /**
   * Determine winning pattern diagonally, right or left.
   *
   * @param {Object<Player>} player
   *
   * @returns {Boolean}
   */
  diagonally(player) {
    if (this._diagonallyRight(player)) {
      return true;
    }

    return this._diagonallyLeft(player);
  }

  /**
   * Going from top right-most to the lowest left-most or vice-versa with the same player.
   *
   * @param {Object<Player>} player
   *
   * @returns {Boolean}
   */
  _diagonallyRight(player) {
    const { row, column } = this.board.getLastCell();
    // this will tread to the right most part of the diagonal
    const startCell = this._getStartCell(player, { row, column }, { row: 1, column: 1 });

    return this._winnerPattern(player, startCell, { row: -1, column: -1 });
  }

  /**
   * Going from top left-most to the lowest right-most or vice-versa with the same player.
   *
   * @param {Object<Player>} player
   *
   * @returns {Boolean}
   */
  _diagonallyLeft(player) {
    const { row, column } = this.board.getLastCell();
    // this will tread to the left most part of the diagonal
    const startCell = this._getStartCell(player, { row, column }, { row: 1, column: -1 });

    return this._winnerPattern(player, startCell, { row: -1, column: 1 });
  }

  /**
   * Determine the cell where we can start looking for the given player's
   * winning pattern by criteria. The criteria determines how we want to
   * tread through the pattern (e.g. {column: -1, row : 0})
   * when looking for the start of horizontal pattern.
   *
   * @param {Player} player
   * @param {Object} currentCell
   * @param {Object} criteria
   *
   * @returns {Object}
   */
  _getStartCell(player, currentCell, criteria) {
    let currentRow = currentCell.row;
    let currentColumn = currentCell.column;

    let currentPlayer;

    for (;;) {
      const nextColumn = currentColumn + (criteria.column);
      const nextRow = currentRow + (criteria.row);

      currentPlayer = this.board.cellPlayer(nextColumn, nextRow);

      if (!currentPlayer || player.getId() !== currentPlayer.getId()) {
        break;
      }

      currentRow = nextRow;
      currentColumn = nextColumn;
    }

    return {
      row: currentRow,
      column: currentColumn,
    };
  }

  /**
   * After finding the cell where we can start looking for the winning
   * pattern, it's time to walk through it depending the criteria.
   *
   * @param {Player} player
   * @param {Object} startCell
   * @param {Object} criteria
   *
   * @returns {Boolean}
   */
  _winnerPattern(player, startCell, criteria) {
    let matches = 0;
    let currentPlayer;
    let currentRow = startCell.row;
    let currentColumn = startCell.column;

    console.log(this.board.getLastCell(), startCell);

    for (;;) {
      currentPlayer = this.board.cellPlayer(currentColumn, currentRow);

      console.log(player, currentPlayer);

      if (!currentPlayer || player.getId() !== currentPlayer.getId()) {
        break;
      }

      matches += 1;
      currentRow += criteria.row;
      currentColumn += criteria.column;
    }

    console.log('matches', matches);

    return matches === 4;
  }
}

export default WinnerValidator;
