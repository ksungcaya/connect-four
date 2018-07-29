<template>
  <h1>GAMES</h1>
</template>

<script>
export default {
  name: "games-list",
  created() {
    this.$http.get('/games').then((response) => {
      console.log(response);
    });
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
