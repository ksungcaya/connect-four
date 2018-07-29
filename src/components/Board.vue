<template>
  <div class="board">
    <div
        v-for="(state) in states"
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
import Game from "../libs/Game";
import Board from "../libs/Board";
import Player from "../libs/Player";

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

        for (let i = this.rows; i !== 0; i--) {
          let state = {
            row: i,
            cells: []
          };

          for (let j = 1; j <= this.cols; j++) {
            let cell = {
              col: j,
              fillClass: ""
            };

            if (this.game) {
              const player = this.game.board.cellPlayer(j, i);

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
      if (this.currentPlayer.getId() === player._id) {
        console.log("turn index: ", lastIndex, player, this.currentPlayer);

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
      if (!this.currentPlayer || !this.currentPlayer.isTurn()) {
        return;
      }

      const col = e.target.getAttribute("data-col");

      this.updateBoard(this.currentPlayer, col);

      this.$socket.emit(
        "turn-over",
        col,
        this.currentPlayer.setTurn(false),
        this.currentPlayerIndex
      );
    },

    updateBoard(player, col) {
      this.game.move(player, col);
      this.$forceUpdate();
    }
  },

  components: {}
};
</script>

<style scoped>
</style>
