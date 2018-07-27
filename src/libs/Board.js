import _ from 'lodash';

class Board {
  /**
   * Board constructor.
   *
   * @param {Integer} columns
   * @param {Integer} rows
   */
  constructor(columns = 7, rows = 6) {
    this.columns = columns;
    this.rows = rows;

    this.cells = {};
    this.lastCell = null;
    this.cellsCount = this.columns * this.rows;
  }

  /**
   * Player move on the column.
   *
   * @param {Player} player
   * @param {Integer} column
   */
  drop(player, column) {
    const row = this._getFreeRow(column);

    if (row === -1) {
      throw new Error(`All rows of column: ${column} were occupied.`);
    }

    const key = this._cellKey(column, row);

    this.cells[key] = player;
    this.cellsCount -= 1;
    this.lastCell = { row, column, player };
  }

  /**
   * Gets the current player occupying the cell.
   *
   * @param {Integer} column
   * @param {Integer} row
   *
   * @return {Object<Player>}
   */
  cellPlayer(column, row) {
    const key = this._cellKey(column, row);

    if (_.has(this.cells, key)) {
      return this.cells[key];
    }

    return null;
  }

  /**
   * Get the recently occupied cell.
   *
   * @returns {Object}
   */
  getLastCell() {
    return this.lastCell;
  }

  /**
   * Get the number of unoccupied cells.
   *
   * @returns {Integer}
   */
  availableCells() {
    return this.cellsCount;
  }

  /**
   * Get the free row from the column.
   * If all rows were occupied, return -1.
   *
   * @param {Integer} column
   *
   * @returns {Integer}
   */
  _getFreeRow(column) {
    for (let row = 1; row <= this.rows; row += 1) {
      const key = this._cellKey(column, row);

      if (!_.has(this.cells, key)) {
        return row;
      }
    }

    return -1;
  }

  /**
   * Create a key combination of column and row
   * that we can use when accessing cells.
   *
   * @param {Integer} column
   * @param {Integer} row
   *
   * @returns {String}
   */
  _cellKey(column, row) {
    return `${column}_${row}`;
  }
}

export default Board;
