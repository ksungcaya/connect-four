<template>
  <ul>
    <li v-for="player in players"
      :key="player.id"
    >
      Player {{ player.id }}
    </li>
  </ul>
</template>

<script>
import Player from "../libs/Player";

export default {
  data() {
    return {
      players: [],
      colors: ["red", "yellow"]
    };
  },
  created() {
    for (let i = 0; i < this.colors.length; i++) {
      this.players.push(new Player(i, this.colors[i]));
    }
  }
};
</script>

<style>
</style>
