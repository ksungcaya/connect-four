class Player {
  constructor(id, color, turn = false) {
    this._id = id;
    this._color = color;
    this._turn = Boolean(turn);
  }

  getId() {
    return this._id;
  }

  color() {
    return this._color;
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
