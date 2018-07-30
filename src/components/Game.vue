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
        :key="`${player.getId()}`"
        :player="player"
        :currentPlayer="currentPlayer"
        @playerClicked="assign"
        @playerChosen="chosen"
      ></player>

      <ready 
        :playersCount="playersCount"
        :player="currentPlayer"
        @addReadyCount="readyCount++"
      ></ready>

      <status
        :currentPlayer="currentPlayer"
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
      gameData: null,
      readyCount: 0,
      playersCount: 0,
      players: {},
      unassignedPlayers: {},
      currentPlayer: null
    };
  },

  watch: {
    readyCount(newCount) {
      if (newCount === this.playersCount) {
        this.$socket.emit("all-ready", this.players);
      }
    }
  },

  created() {
    this.loadGame();
    window.addEventListener("beforeunload", this.leavingGame, false);
  },

  sockets: {
    connect() {
      this.$socket.emit("join-game", this.getName());
    }
  },

  methods: {
    assign(player) {
      this.currentPlayer = this.addPlayer(player);
      this.$socket.emit("player-assign", player);
    },

    chosen(player) {
      this.addPlayer(player);
      this.$forceUpdate();
    },

    addPlayer(player) {
      this.unassignedPlayers[player.getId()] = player.choose();
      this.players[player.getId()] = player;
      this.playersCount++;

      return player;
    },

    loadGame() {
      this.$http.get(`/api/games/${this.getName()}`).then(({ data }) => {
        if (!data) {
          return this.$router.push("/not-found");
        }

        this.gameData = data;
        this.game = new Game(new GameBoard(data.cols, data.rows));

        for (let i = 0; i < data.players.length; i++) {
          const { id, color, isTaken } = data.players[i];
          this.unassignedPlayers[id] = new GamePlayer(id, color, isTaken);
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
