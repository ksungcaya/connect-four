<template>
  <button @click="ready" :disabled="disabled">Ready</button>
</template>

<script>
export default {
  props: ["players", "player"],

  data() {
    return {
      isReady: false
    };
  },

  computed: {
    disabled() {
      return this.isReady === true || this.players.length < 2 || !this.player;
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
      this.$socket.emit("player-ready", this.player);
    }
  }
};
</script>

<style>
</style>
