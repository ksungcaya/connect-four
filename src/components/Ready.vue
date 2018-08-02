<template>
  <button @click="ready" :disabled="disabled" class="btn btn-light btn-ready">Ready</button>
</template>

<script>
export default {
  props: ["playersCount", "player", "gameId"],

  data() {
    return {
      isReady: false
    };
  },

  computed: {
    disabled() {
      return this.isReady === true || this.playersCount < 2 || !this.player;
    }
  },

  sockets: {
    otherPlayerReady(player) {
      if (player._id !== this.player.getId()) {
        this.$emit("addReadyCount");
      }
    }
  },

  methods: {
    ready() {
      this.isReady = true;
      this.$emit("addReadyCount");
      this.$socket.emit("player-ready", this.gameId, this.player);
    }
  }
};
</script>

<style>
.btn-ready {
  margin: 20px 0;
}
</style>
