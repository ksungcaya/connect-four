<template>
  <div class="game__status">
    <span class="game__status__turn" v-if="turnStatus">{{ turnStatus }}</span>
    <span class="game__status__winner" v-if="winnerStatus">{{ winnerStatus }}</span>
  </div>
</template>

<script>
export default {
  props: ["currentPlayer"],

  data() {
    return {
      winnerStatus: "",
      turnStatus: ""
    };
  },

  sockets: {
    changeTurn(player) {
      let text = `Player ${player._color}'s turn.`;

      if (this.currentPlayer && this.currentPlayer.getId() === player._id) {
        text = "Your turn.";
      }

      this.turnStatus = text;
    },

    playerWon(player) {
      let text = `Player ${player._color} won.`;

      if (this.currentPlayer && this.currentPlayer.getId() === player._id) {
        text = "You won.";
      }

      this.endGame(text, player);
    },

    gameDraw() {
      this.endGame("Game is a draw.");
    }
  },

  methods: {
    endGame(text, player) {
      this.turnStatus = "";
      this.winnerStatus = text;
      this.$emit("endGame", player);
    }
  }
};
</script>

<style>
.game__status__turn,
.game__status__winner {
  font-size: 2em;
  font-weight: bold;
}

/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
  .game__status {
    display: inline-block;
    vertical-align: middle;
  }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
  .game__status__turn,
  .game__status__winner {
    font-size: 1em;
  }
}
</style>
