<template>
  <div @click="choose" class="player" :class="currentPlayerClass">
    <span class="player__color" :class="`color--${playerData.color()}`"></span>
    <span class="player__name">Player {{ playerData.getId() }}</span>
  </div>
</template>

<script>
export default {
  props: ["player", "currentPlayer"],
  data() {
    return {
      playerData: this.player
    };
  },
  computed: {
    currentPlayerClass() {
      return this.playerData === this.currentPlayer ? "player--current" : "";
    }
  },
  methods: {
    choose() {
      if (this.playerData.isTaken()) {
        return;
      }

      console.log(`player ${this.playerData.getId()} chosen`);
      this.$emit("playerChosen", this.playerData);
      this.$forceUpdate();
    }
  }
};
</script>

<style>
</style>
