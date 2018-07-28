
<template>
  <span 
    class="board__cell"
    :class="fillClass"
    :data-row="dataRow" 
    :data-col="dataCol"
    @click="onClick">
  </span>
</template>

<script>
export default {
  props: ["data-row", "data-col", "cells"],

  data() {
    return {};
  },

  computed: {
    player: {
      cache: false,
      get() {
        const key = `${this.dataCol}_${this.dataRow}`;

        return this.cells[key];
      }
    },

    fillClass: {
      cache: false,
      get() {
        if (this.player) {
          return `board__cell--${this.player.color()}`;
        }
      }
    }
  },

  methods: {
    onClick() {
      this.$emit("click", this.dataCol, this.dataRow);
    }
  }
};
</script>

<style>
</style>
