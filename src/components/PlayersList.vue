<template>
  <div class="players" v-if="game">
    <h3>Players</h3>
    <player 
      v-for="player in unassignedPlayers"
      :key="`${player.getId()}`"
      :player="player"
      :currentPlayer="currentPlayer"
      @playerClicked="assign"
      @playerSelected="addPlayer"
    ></player>

    <ready 
      :playersCount="playersCount"
      :player="currentPlayer"
      :gameId="game.id()"
      @addReadyCount="$emit('addReadyCount')"
    ></ready>
  </div>
</template>

<script>
import Player from "./Player.vue";
import Ready from "./Ready.vue";

export default {
  props: [
    "game",
    "unassignedPlayers",
    "currentPlayer",
    "playersCount",
    "players",
    "readyCount"
  ],

  data() {
    return {};
  },

  watch: {
    readyCount(newCount) {
      if (newCount > 0 && newCount === this.playersCount) {
        this.$socket.emit("all-ready", this.game.id(), this.players);
        this.$emit("allPlayersReady");
      }
    }
  },

  methods: {
    assign(player) {
      this.$emit("currentPlayerSelected", this.addPlayer(player));
      this.$socket.emit("player-assign", this.game.id(), player);
    },

    addPlayer(player) {
      this.$emit("playerSelected", player.choose());

      return player;
    }
  },

  components: { Player, Ready }
};
</script>

<style>
/* Small Devices, Tablets */
@media only screen and (max-width: 768px) {
  .players {
    display: inline-block;
  }
}
</style>

