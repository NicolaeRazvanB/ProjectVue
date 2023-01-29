<script setup></script>

<template>
  <h1 id="title">Avaible wineries</h1>
  <div id="wineryContainer">
    <div v-for="winery in wineries" class="wineryCard">
      <h3>Name: {{ winery.name }}</h3>
      <h3>Location: {{ winery.location }}</h3>
      <h3>Founded in: {{ winery.foundingYear }}</h3>
      <div>
        <button>Show Wines</button>
        <button v-if="isAuthenticated" @click="editWinery(winery)">Edit</button>
        <button v-if="isAuthenticated" @click="deleteWinery(winery)">
          Delete
        </button>
      </div>
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
  methods: {
    deleteWinery(winery) {
      this.$store.dispatch("deleteWinery", winery);
      let requestParams = { ...requestOptions };
      requestParams.headers.Authorization =
        "Bearer " + window.localStorage.getItem("JWTtoken");
      requestParams.method = "DELETE";
      fetch(base_url + "wineries/" + winery.id, requestParams);
    },
    editWinery(winery) {
      this.$router.push({ path: "/editWinery", query: winery });
    },
  },
};
</script>

<style>
#title {
  display: flex;
  justify-content: center;
  height: 20px;
}
#wineryContainer {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
}
.wineryCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid green;
  width: fit-content;
  margin: 3px;
  height: max-content;
  padding: 3px;
}

body {
  background-color: lightskyblue;
}
</style>
