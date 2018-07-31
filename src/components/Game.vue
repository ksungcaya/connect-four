<template>
  <div class="game row">
    <div class="col-8 align-self-end">
      <board
        :game="game"
        :gameData="gameData"
        :players="players"
        :currentPlayer="currentPlayer"
      ></board>
    </div>

    <div class="game-side col-3 align-self-start">
      <a href="/" @click.prevent="toGames" class="back-link">&laquo; Games</a>

      <div class="players">
        <h3>Players</h3>
        <player 
          v-for="player in unassignedPlayers"
          :key="`${player.getId()}`"
          :player="player"
          :currentPlayer="currentPlayer"
          @playerClicked="assign"
          @playerChosen="addPlayer"
        ></player>

        <ready 
          :playersCount="playersCount"
          :player="currentPlayer"
          :gameName="this.getName()"
          @addReadyCount="readyCount++"
        ></ready>
      </div>

      <status
        :currentPlayer="currentPlayer"
        @endGame="endGame"
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

      if (newCount > 0 && newCount === this.playersCount) {
        this.$socket.emit("all-ready", this.getName(), this.players);
        this.lockGame();
      }
    }
  },

  created() {
    this.loadGame();
    window.addEventListener("beforeunload", this.leavingGame, false);
  },

  sockets: {
    playerDisconnected(player) {
      this.unlockGame().then(() => {
        alert(`Player ${player._color} left. Game will be refreshed.`);

        this.leavingGame();
        window.removeEventListener("beforeunload", this.leavingGame);
        window.location.reload();
      });
    },

    joinGame() {
      alert(`A player joined the game.`);
      this.resetGame();
    }
  },

  methods: {
    toGames() {
      this.leavingGame();
      this.$router.push({ path: "/" });
    },

    leavingGame() {
      if (this.playersCount >= 2 && this.currentPlayer) {
        this.$socket.emit("player-left", this.getName(), this.currentPlayer);
      }

      this.$socket.emit("client-left", this.getName());
    },

    assign(player) {
      this.currentPlayer = this.addPlayer(player);
      this.$socket.emit("player-assign", this.getName(), player);
    },

    addPlayer(player) {
      this.unassignedPlayers[player.getId()] = player.choose();
      this.players[player.getId()] = player;
      this.playersCount++;

      return player;
    },

    resetGame() {
      for (const id in this.players) {
        if (this.players.hasOwnProperty(id)) {
          const player = this.players[id];

          this.unassignedPlayers[id] = player.setTaken(false);
        }
      }

      this.players = {};
      this.playersCount = 0;
      this.readyCount = 0;
      this.currentPlayer = null;
    },

    lockGame() {
      this.$http
        .post(`/api/games/lock`, { id: this.getName() })
        .catch(error => {
          console.log(error);
        })
        .then(({ data }) => {
          console.log("game locked.");
        });
    },

    unlockGame() {
      return this.$http
        .post(`/api/games/unlock`, { id: this.getName() })
        .catch(error => {
          console.log(error);
        });
    },

    endGame() {
      this.$http
        .post(`/api/games/end`, { id: this.getName() })
        .catch(error => {
          console.log(error);
        })
        .then(({ data }) => {
          console.log("game ended.");
        });
    },

    loadGame() {
      this.$http.get(`/api/games/${this.getName()}`).then(({ data }) => {
        if (!data || data.ended) {
          return this.$router.push("/not-found");
        }

        if (data.locked) {
          return this.$router.push("/game-locked");
        }

        this.gameData = data;
        this.game = new Game(new GameBoard(data.cols, data.rows));

        for (let i = 0; i < data.players.length; i++) {
          const { id, color, isTaken } = data.players[i];
          this.unassignedPlayers[id] = new GamePlayer(id, color, isTaken);
        }

        console.log('joining game: ', this.getName());
        this.$socket.emit("join-game", this.getName());
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
.game {
  margin-top: 70px;
}

.game-side {
  text-align: left;
}
</style>
