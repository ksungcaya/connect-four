<template>
  <div class="games">
    <h1>Games</h1>

    <span v-if="games.length === 0">No games yet.</span>

    <ul v-else>
      <li v-for="game in games" :key="game.id">
        <router-link :to="`/games/${game.id}`">{{ game.name }}</router-link>
      </li>
    </ul>

    <new-game @created="add"></new-game>
  </div>
</template>

<script>
import NewGame from "./NewGame.vue";

export default {
  created() {
    this.fetch();
  },
  data() {
    return {
      games: []
    };
  },
  methods: {
    fetch() {
      this.$http.get("/api/games").then(this.refresh);
    },
    refresh({ data }) {
      this.games = data;
    },
    add(data) {
      this.games.push(data);
    }
  },
  components: { NewGame }
};
</script>

<style>
</style>
