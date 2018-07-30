import WinnerValidator from './WinnerValidator';

class Game {
  constructor(board) {
    this.board = board;
    this.validate = new WinnerValidator(this.board);
    this.winner = null;
  }

  move(player, column) {
    return this.board.drop(player, column);
  }

  cellPlayer(column, row) {
    return this.board.cellPlayer(column, row);
  }

  hasWonBy(player) {
    switch (true) {
      case this.validate.vertically(player) === true:
        return this.setWinner(player);

      case this.validate.horizontally(player) === true:
        return this.setWinner(player);

      case this.validate.diagonally(player) === true:
        return this.setWinner(player);

      default:
        return false;
    }
  }

  setWinner(player) {
    this.winner = player;

    return true;
  }

  getWinner() {
    return this.winner;
  }
}

export default Game;
