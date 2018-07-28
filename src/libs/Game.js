import WinnerValidator from './WinnerValidator';

class Game {
  constructor(board) {
    this.board = board;
    this.validate = new WinnerValidator(this.board);
  }

  move(player, column) {
    return this.board.drop(player, column);
  }

  hasWonBy(player) {
    switch (true) {
      case this.validate.vertically(player) === true:
        return true;

      case this.validate.horizontally(player) === true:
        return true;

      case this.validate.diagonally(player) === true:
        return true;

      default:
        return false;
    }
  }
}

export default Game;
