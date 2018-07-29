<template>
  <div @click="choose" class="player" :class="chosenClass">
    <span class="player__color" :class="`color--${playerData.color()}`"></span>
    <span class="player__name">Player {{ this.playerData.getId() }}</span>
    <span v-if="this.player === this.currentPlayer"> (You)</span>
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
    chosenClass() {
      return this.playerData.isTaken() ? "player--chosen" : "";
    }
  },

  sockets: {
    playerAssigned(player) {
      if (player._id === this.playerData.getId()) {
        console.log("player assigned ", player);
        this.$emit("playerChosen", this.playerData);
      }
    }
  },

  methods: {
    choose() {
      if (this.currentPlayer || this.playerData.isTaken()) {
        return;
      }

      this.$emit("playerClicked", this.playerData);
      this.$forceUpdate();
    }
  }
};
</script>

<style>
</style>
