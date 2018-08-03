<template>
  <div>
    <div class="input-group game-form">
      <input 
        type="text"
        class="form-control"
        name="name"
        v-model="name"
        @keyup.enter="createGame">
      <div class="input-group-append">
        <button type="submit"
                placeholder="Enter game name"
                class="btn btn-outline-secondary"
                @click="createGame">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      cols: 7,
      rows: 6,
      colors: ["red", "yellow"]
    };
  },

  methods: {
    createGame() {
      if (this.name.length <= 2) {
        return;
      }

      this.$http
        .post("/api/games", {
          name: this.name,
          cols: this.cols,
          rows: this.rows,
          colors: this.colors
        })
        .catch(error => {
          console.log(error);
        })
        .then(({ data }) => {
          this.name = "";
          this.$emit("created", data);
        });
    }
  }
};
</script>

<style>
</style>
