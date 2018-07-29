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
import Cell from "./Cell.vue";
import Game from "../libs/Game";
import Board from "../libs/Board";
import Player from "../libs/Player";

export default {
  props: {},

  data() {
    return {
      cols: 7,
      rows: 6,
      game: null,
      players: [],
      currentPlayer: null,
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

  created() {
    this.currentPlayerIndex = 0;
    this.game = new Game(new Board(this.cols, this.rows));
    this.cells = this.game.board.cells;
    this.players = [new Player("red", "red"), new Player("yellow", "yellow")];
    this.currentPlayer = this.players[this.currentPlayerIndex].setTurn(true);
  },

  methods: {
    drop(e) {
      const col = e.target.getAttribute("data-col");

      this.game.move(this.currentPlayer, col);

      this.$forceUpdate();

      let newIndex = this.currentPlayerIndex + 1;

      if (this.players[newIndex] === undefined) {
        newIndex = 0;
      }

      this.currentPlayer.setTurn(false);

      this.currentPlayerIndex = newIndex;
      this.currentPlayer = this.players[newIndex].setTurn(true);
    }
  },

  components: {
    Cell
  }
};
</script>

<style scoped>
</style>
