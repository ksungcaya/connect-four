<template>
  <div class="games-list">
    <h1>Games</h1>

    <span v-if="games.length === 0">No games yet.</span>

    <div 
      class="list-group"
      v-for="game in games"
      :key="game.id"
      v-else>
        <router-link 
          :to="`/games/${game.id}`"
          class="list-group-item list-group-item-action game__link">
          {{ game.name }}
        </router-link>
    </div>

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
.games-list {
  margin-top: 70px;
}

.game-form {
  margin-top: 20px;
}
</style>
