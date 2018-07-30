<template>
  <div class="game">
    <board
      :game="game"
      :gameData="gameData"
      :players="players"
      :currentPlayer="currentPlayer"
    ></board>

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

      <status
        :currentPlayer="currentPlayer"
        :playerTurn="playerTurn"
      ></status>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import Player from "./Player.vue";
import Ready from "./Ready.vue";
import Status from "./Status.vue";

import Game from "../libs/Game";
import GameBoard from "../libs/Board";
import GamePlayer from "../libs/Player";

export default {
  data() {
    return {
      game: null,
      cols: null,
      rows: null,
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
    this.createNewGame();
  },

  sockets: {
    connect() {
      this.$socket.emit("join-game", this.getName());
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
    },

    createNewGame() {
      this.$http.get(`/api/games/${this.getName()}`).then(({ data }) => {
        if (!data) {
          return this.$router.push("/not-found");
        }

        console.log(data);
        this.gameData = data;
        this.game = new Game(new GameBoard(data.cols, data.rows));

        for (let i = 0; i < this.colors.length; i++) {
          this.unassignedPlayers[i] = new GamePlayer(i, this.colors[i]);
        }
      });
    },

    getName() {
      return this.$route.params.game;
    }
  },

  components: { Board, Player, Ready, Status }
};
</script>

<style>
</style>
