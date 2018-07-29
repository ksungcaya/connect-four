<template>
  <div>
    <board
      :game="game"
      :players="players"
      :cols="cols"
      :rows="rows"
      :currentPlayer="currentPlayer">
    </board>

    <div class="players">
      <h3>Players</h3>
      <player 
        v-for="player in unassignedPlayers"
        :key="`${player.getId()}-${count}`"
        :player="player"
        :currentPlayer="currentPlayer"
        @playerClicked="assign"
        @playerChosen="chosen"
      ></player>

      <ready 
        :players="players"
        :player="currentPlayer"
        @addReadyCount="readyCount++"
      ></ready>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import Player from "./Player.vue";
import Ready from "./Ready.vue";
import Game from "../libs/Game";
import GameBoard from "../libs/Board";
import GamePlayer from "../libs/Player";

export default {
  data() {
    return {
      game: null,
      cols: 7,
      rows: 6,
      readyCount: 0,
      unassignedPlayers: [],
      colors: ["red", "yellow"],
      currentPlayer: null
    };
  },

  watch: {
    readyCount(newCount) {
      if (newCount === this.players.length) {
        this.$socket.emit("all-ready", this.players);
      }
    }
  },

  computed: {
    players: {
      cache: false,
      get() {
        return this.unassignedPlayers.filter(player => player.isTaken());
      }
    }
  },

  created() {
    this.game = new Game(new GameBoard(this.cols, this.rows));

    for (let i = 0; i < this.colors.length; i++) {
      this.unassignedPlayers[i] = new GamePlayer(i, this.colors[i]);
    }
  },

  sockets: {
    connect() {
      this.$socket.emit("join-game", this.$route.params.game);
    }
  },

  methods: {
    assign(player) {
      this.currentPlayer = player.choose();
      this.$socket.emit("player-assign", player);
    },

    chosen(player) {
      this.unassignedPlayers[player.getId()] = player.choose();
      this.$forceUpdate();
    }
  },

  components: { Board, Player, Ready }
};
</script>

<style>
</style>
