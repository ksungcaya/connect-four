<template>
  <div id="app">
      <board></board>
  </div>
</template>


<script>
import Board from "./Board.vue";

export default {
  name: "app",
  data() {
    return {
      moves: []
    };
  },
  components: { Board }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
