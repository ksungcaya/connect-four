<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: "app",
  created() {
    console.log('created');
  },
  data() {
    return {};
  }
};
</script>

<style>
.container {
  text-align: center;
}
</style>
