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
}

export default WinnerValidator;
