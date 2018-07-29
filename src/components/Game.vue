<template>
  <div>
    <board></board>
    <div class="players">
      <h3>Players</h3>
      <player 
        v-for="player in players"
        :key="`${player.getId()}-${count}`"
        :player="player"
        :currentPlayer="currentPlayer"
        @playerClicked="assign"
        @playerChosen="chosen"
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
      game: '',
      currentPlayer: null
    };
  },
  created() {
    this.game = this.$route.params.game;

    for (let i = 0; i < this.colors.length; i++) {
      this.players[i] = new GamePlayer(i, this.colors[i]);
    }
  },
  sockets: {
    connect() {
      this.$socket.emit('join-game', this.game);
    }
  },
  methods: {
    assign(player) {
      this.currentPlayer = player.choose();
      this.$socket.emit('player-assign', player);
    },
    chosen(player) {
      this.players[player.getId()] = player.choose();
      this.$forceUpdate();
    }
  },
  components: { Board, Player }
};
</script>

<style>
</style>
