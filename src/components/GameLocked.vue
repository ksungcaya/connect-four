<template>
  <div class="game-locked alert alert-primary">
    The game you're trying to access is currently locked.
    <router-link :to="{ path: '/' }"> Back to games.</router-link>
  </div>
</template>

<script>
export default {};
</script>

