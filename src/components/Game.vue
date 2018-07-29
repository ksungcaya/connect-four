<template>
  <div>
    <board></board>
    <div class="players">
      <h3>Players</h3>
      <player 
        v-for="player in players"
        :key="player.getId()"
        :player="player"
        :currentPlayer="currentPlayer"
        @playerChosen="assign"
      ></player>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import Player from "./Player.vue";
import GamePlayer from "../libs/Player";

export default {
  data() {
    return {
      players: {},
      colors: ["red", "yellow"],
      currentPlayer: null
    };
  },
  created() {
    console.log(this.$route.params.game);

    for (let i = 0; i < this.colors.length; i++) {
      this.players[i] = new GamePlayer(i, this.colors[i]);
    }
  },
  methods: {
    assign(player) {
      this.currentPlayer = player.choose();

      console.log(
        "current player" +
          this.currentPlayer.getId() +
          " : " +
          this.currentPlayer.isTaken()
      );
    }
  },
  components: { Board, Player }
};
</script>

<style>
</style>
