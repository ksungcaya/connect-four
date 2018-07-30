class Player {
  constructor(id, color, taken = false, turn = false) {
    this._id = id;
    this._color = color;
    this._turn = Boolean(turn);
    this._taken = Boolean(taken);
  }

  getId() {
    return this._id;
  }

  color() {
    return this._color;
  }

  choose() {
    this._taken = true;

    return this;
  }

  isTaken() {
    return this._taken;
  }

  setTurn(isTurn) {
    this._turn = Boolean(isTurn);

    return this;
  }

  isTurn() {
    return Boolean(this._turn);
  }
}

export default Player;
