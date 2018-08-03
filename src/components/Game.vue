<template>
  <div class="game row">
    <div class="game-side col-lg-3 col-sm-12">
      <a href="/" @click.prevent="toGames" class="back-link">&laquo; Games</a>

      <players-list
        :game="game"
        :unassignedPlayers="unassignedPlayers"
        :currentPlayer="currentPlayer"
        :players="players"
        :readyCount="readyCount"
        :playersCount="playersCount"
        @currentPlayerSelected="currentPlayerSelected"
        @playerSelected="playerSelected"
        @allPlayersReady="lockGame"
        @addReadyCount="readyCount++"
      ></players-list>

      <status
        :currentPlayer="currentPlayer"
        @endGame="endGame"
      ></status>
    </div>

    <div class="col-lg-9 col-sm-12">
      <board
        :game="game"
        :players="players"
        :currentPlayer="currentPlayer"
      ></board>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import Status from "./Status.vue";
import PlayersList from "./PlayersList.vue";

import Game from "../libs/Game";
import GameBoard from "../libs/Board";
import GamePlayer from "../libs/Player";

export default {
  data() {
    return {
      game: null,
      unassignedPlayers: {},
      playersCount: 0,
      readyCount: 0,
      players: {},
      currentPlayer: null
    };
  },

  created() {
    this.loadGame();
    window.addEventListener("beforeunload", this.leavingGame, false);
  },

  sockets: {
    playerDisconnected(player) {
      this.unlockGame().then(() => {
        alert(`Player ${player._color} left. Game will be refreshed.`);

        // current client should not be notified before emitting player-left event.
        window.removeEventListener("beforeunload", this.leavingGame);

        this.leavingGame();
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
        this.$socket.emit("player-left", this.gameId(), this.currentPlayer);
      }
    },

    currentPlayerSelected(player) {
      this.currentPlayer = player;
    },

    playerSelected(player) {
      this.unassignedPlayers[player.getId()] = player;
      this.players[player.getId()] = player;
      this.playersCount++;
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
        .post(`/api/games/lock`, { id: this.gameId() })
        .catch(error => console.log(error))
        .then(({ data }) => console.log("game locked."));
    },

    unlockGame() {
      return this.$http
        .post(`/api/games/unlock`, { id: this.gameId() })
        .catch(error => console.log(error));
    },

    endGame() {
      this.$http
        .post(`/api/games/end`, { id: this.gameId() })
        .catch(error => console.log(error))
        .then(({ data }) => console.log("game ended."));
    },

    loadGame() {
      this.$http.get(`/api/games/${this.gameId()}`).then(({ data }) => {
        if (!data || data.ended) {
          return this.$router.push("/not-found");
        }

        if (data.locked) {
          return this.$router.push("/game-locked");
        }

        this.setUpGame(data);
      });
    },

    setUpGame(data) {
      this.game = new Game(new GameBoard(data.cols, data.rows), data.id);

      for (let i = 0; i < data.players.length; i++) {
        const { id, color, isTaken } = data.players[i];
        this.unassignedPlayers[id] = new GamePlayer(id, color, isTaken);
      }

      this.$socket.emit("join-game", this.gameId());
    },

    gameId() {
      if (this.game) {
        return this.game.id();
      }

      return this.$route.params.game;
    }
  },

  components: { Board, PlayersList, Status }
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
