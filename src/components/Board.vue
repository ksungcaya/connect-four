<template>
  <div class="board" v-if="game">
    <div
        v-for="state in states"
        class="board__row"
        :data-row="state.row"
        :key="`row-${state.row}`">
      <span
        v-for="cell in state.cells"
        class="board__cell"
        :class="cell.fillClass"
        @click="drop"
        :key="`${cell.col}-${state.row}-${cell.fillClass}`"
        :data-row="state.row"
        :data-col="cell.col">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["game", "currentPlayer", "players"],

  data() {
    return {
      currentPlayerIndex: null
    };
  },

  computed: {
    states: {
      cache: false,
      get() {
        let states = [];

        for (let i = this.game.rowCount(); i !== 0; i--) {
          let state = {
            row: i,
            cells: []
          };

          for (let j = 1; j <= this.game.columnCount(); j++) {
            let cell = {
              col: j,
              fillClass: ""
            };

            if (this.game) {
              const player = this.game.cellPlayer(j, i);

              if (player) {
                cell.fillClass = `color--${player.color()}`;
              }
            }

            state.cells.push(cell);
          }

          states.push(state);
        }

        return states;
      }
    }
  },

  created() {},

  sockets: {
    playerTurn(player, lastIndex, lastPlayer, lastCol) {
      if (this.currentPlayer && this.currentPlayer.getId() === player._id) {
        if (lastPlayer) {
          this.updateBoard(this.players[lastPlayer._id], lastCol);
        }

        this.currentPlayer.setTurn(true);
        this.currentPlayerIndex = lastIndex;
      }
    }
  },

  methods: {
    drop(e) {
      if (
        !this.currentPlayer ||
        !this.currentPlayer.isTurn() ||
        this.game.getWinner()
      ) {
        return;
      }

      const col = e.target.getAttribute("data-col");

      this.updateBoard(this.currentPlayer, col);

      this.$socket.emit(
        "turn-over",
        this.game.id(),
        col,
        this.currentPlayer.setTurn(false),
        this.currentPlayerIndex,
        this.players
      );
    },

    updateBoard(player, col) {
      this.game.move(player, col);
      this.$forceUpdate();

      this.checkWinner(player);
    },

    checkWinner(player) {
      if (this.game.hasWonBy(player)) {
        console.log("Player ", player.color(), " won");
        return this.$socket.emit("player-won", this.game.id(), player);
      }

      if (this.game.isDraw()) {
        console.log("Game is a draw.");
        return this.$socket.emit("game-draw", this.game.id());
      }
    }
  },

  components: {}
};
</script>

<style>
.board {
  background-color: darkslateblue;
  display: inline-block;
}

.board__cell {
  display: inline-block;
  background-color: white;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin: 5px;
}

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
  .board__cell {
    width: 60px !important;
    height: 60px !important;
  }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .board__cell {
    width: 40px !important;
    height: 40px !important;
  }
}
</style>
