class WinnerValidator {
  constructor(board) {
    this.board = board;
  }

  /**
   * Going from topMost to lowest or vice-versa with the same player.
   *
   * @param {Object<Player>} player
   *
   * @returns {Boolean}
   */
  vertically(player) {
    const { row, column } = this.board.getLastCell();

    let currentRow = row;
    let currentPlayer;
    let matches = 0;
    let lowest = false;

    // going low
    while (!lowest) {
      currentRow -= 1;
      currentPlayer = this.board.cellPlayer(column, currentRow);

      if (!currentPlayer || player !== currentPlayer) {
        lowest = true;
      }
    }

    // going up
    currentRow += 1;
    currentPlayer = this.board.cellPlayer(column, currentRow);

    while (currentPlayer && player === currentPlayer) {
      matches += 1;
      currentRow += 1;

      currentPlayer = this.board.cellPlayer(column, currentRow);
    }

    return matches === 4;
  }

  horizontally(player) {
    const { row, column } = this.board.getLastCell();

    let currentColumn = column;
    let currentPlayer;
    let matches = 0;
    let leftMost = false;

    // going left
    while (!leftMost) {
      currentColumn -= 1;
      currentPlayer = this.board.cellPlayer(currentColumn, row);

      if (!currentPlayer || player !== currentPlayer) {
        leftMost = true;
      }
    }

    // going right
    currentColumn += 1;
    currentPlayer = this.board.cellPlayer(currentColumn, row);

    while (currentPlayer && player === currentPlayer) {
      matches += 1;
      currentColumn += 1;

      currentPlayer = this.board.cellPlayer(currentColumn, row);
    }

    return matches === 4;
  }

  diagonally(player) {
    if (this._diagonallyRight(player)) {
      return true;
    }

    return this._diagonallyLeft(player);
  }

  _diagonallyRight(player) {
    const { row, column } = this.board.getLastCell();

    let currentColumn = column;
    let currentRow = row;
    let currentPlayer;
    let matches = 0;
    let rightMost = false;

    // treading to top right most
    while (!rightMost) {
      currentRow += 1;
      currentColumn += 1;
      currentPlayer = this.board.cellPlayer(currentColumn, currentRow);

      if (!currentPlayer || player !== currentPlayer) {
        rightMost = true;
      }
    }

    currentRow -= 1;
    currentColumn -= 1;
    currentPlayer = this.board.cellPlayer(currentColumn, currentRow);

    while (currentPlayer && player === currentPlayer) {
      matches += 1;
      currentColumn -= 1;
      currentRow -= 1;

      currentPlayer = this.board.cellPlayer(currentColumn, currentRow);
    }

    return matches === 4;
  }

  _diagonallyLeft(player) { // eslint-disable-line
    return false;
  }
}

export default WinnerValidator;
