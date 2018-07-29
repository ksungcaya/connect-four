<template>
  <board></board>
</template>

<script>
import Board from "./Board.vue";

export default {
  name: "game",
  created() {
    console.log(this.$route.params.game)
  },
  data() {
    return {};
  },
  components: { Board }
};
</script>

<style>
</style>
