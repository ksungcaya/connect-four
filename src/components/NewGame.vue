<template>
  <div>
    <div class="form-group">
      <input type="text" name="name" v-model="name">
    </div>

    <button type="submit"
            class="btn btn-default"
            @click="createGame">Create</button>
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
      this.$http
        .post("/api/games", {
          name: this.name,
          cols: this.cols,
          rows: this.rows,
          colors: this.colors,
        })
        .catch(error => {
          console.log(error);
        })
        .then(({ data }) => {
          this.name = "";
          this.$emit("created", data);

          console.log(data);
        });
    }
  }
};
</script>

<style>
</style>
