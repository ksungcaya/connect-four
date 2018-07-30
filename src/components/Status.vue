<template>
  <div clsas="game__status">
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
      let text = `Player ${player._id}'s turn.`;

      if (this.currentPlayer.getId() === player._id) {
        text = "Your turn.";
      }

      this.turnStatus = text;
    },
    playerWon(player) {
      let text = "You lost.";

      if (this.currentPlayer.getId() === player._id) {
        text = "You won.";
      }

      this.turnStatus = '';
      this.winnerStatus = text;
    }
  },
  created() {}
};
</script>
