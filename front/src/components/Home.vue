<script setup></script>

<template>
  <h1 id="title">Avaible wineries</h1>
  <div id="wineryContainer">
    <div v-for="winery in wineries" class="wineryCard">
      <h3>Name: {{ winery.name }}</h3>
      <h3>Location: {{ winery.location }}</h3>
      <h3>Founded in: {{ winery.foundingYear }}</h3>
      <div>
        <button @click="showWines(winery)" class="activeButtons">
          Show Wines
        </button>
        <button
          v-if="isAuthenticated"
          @click="editWinery(winery)"
          class="activeButtons"
        >
          Edit
        </button>
        <button
          v-if="isAuthenticated"
          @click="deleteWinery(winery)"
          class="activeButtons"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestOptions, base_url } from "@/requestOptions";
export default {
  data() {
    return { wineries: [] };
  },
  created() {
    if (!this.wineries.length) {
      fetch(base_url + "wineries", requestOptions).then((res) =>
        res.json().then((res) => {
          this.wineries = [...res];
        })
      );
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    deleteWinery(winery) {
      let requestParams = { ...requestOptions };
      requestParams.headers.Authorization =
        "Bearer " + window.localStorage.getItem("JWTtoken");
      requestParams.method = "DELETE";
      fetch(base_url + "wineries/" + winery.id, requestParams);
      this.wineries.splice(this.wineries.indexOf(winery), 1);
    },
    editWinery(winery) {
      this.$router.push({ path: "/editWinery", query: winery });
    },
    showWines(winery) {
      this.$router.push({ path: "/wines", query: winery });
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
}
.wineryCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid;
  border-color: rgb(82, 16, 9) s;
  border-radius: 5px;
  width: fit-content;
  margin: 3px;
  height: max-content;
  padding: 3px;
}

.activeButtons {
  background-color: rgb(172, 75, 65);
  color: whitesmoke;
  border-radius: 5px;
  border-color: rgb(82, 16, 9);
  height: 30px;
  margin: 3px;
  margin-top: 10px;
}
body {
  background-color: rgb(150, 235, 171);
}
</style>
