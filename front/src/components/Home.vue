<script setup></script>

<template>
  <h1 id="title">Avaible wineries</h1>
  <div id="wineryContainer">
    <div v-for="winery in wineries" class="wineryCard">
      <h3>Name: {{ winery.name }}</h3>
      <h3>Location: {{ winery.location }}</h3>
      <h3>Founded in: {{ winery.foundingYear }}</h3>
    </div>
  </div>
</template>

<script>
import { requestOptions, base_url } from "@/requestOptions";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  created() {
    if (!this.wineries.length) {
      fetch(base_url + "wineries", requestOptions).then((res) =>
        res.json().then((res) => {
          console.log(res);
          this.$store.dispatch("fetchWineries", res);
        })
      );
    }
  },
  computed: {
    wineries() {
      return this.$store.state.wineries;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {},
};
</script>

<style>
#title {
  display: flex;
  justify-content: center;
  height: 50px;
}
#wineryContainer {
  height: 100vh;
  background-color: lightskyblue;
}
.wineryCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid green;
  width: fit-content;
  margin: 3px;
}
</style>
