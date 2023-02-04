<template>
  <h1 id="title">Avaible wines for {{ this.$route.query.name }}</h1>
  <button v-if="isAuthenticated" @click="addWine()">Add Wine</button>
  <div id="wineryContainer">
    <div v-for="wine in this.wines" class="wineryCard">
      <h3>Name: {{ wine.name }}</h3>
      <h3>Type: {{ wine.type }}</h3>
      <h3>Variety: {{ wine.variety }}</h3>
      <h3>Variety: {{ wine.color }}</h3>
      <div>
        <button v-if="isAuthenticated" @click="editWine(wine)">Edit</button>
        <button v-if="isAuthenticated" @click="deleteWine(wine)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { requestOptions, base_url } from "@/requestOptions";
import { NavigationFailureType } from "vue-router";
export default {
  name: "Wines",
  components: {},
  data() {
    return { wines: [] };
  },
  created() {
    if (!this.wines.length) {
      fetch(
        base_url + "wineries/wines/" + this.$route.query.id,
        requestOptions
      ).then((res) =>
        res.json().then((res) => {
          this.wines = [...res];
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
    deleteWine(wine) {
      this.wines.splice(this.wines.indexOf(wine), 1);
      let requestParams = { ...requestOptions };
      requestParams.headers.Authorization =
        "Bearer " + window.localStorage.getItem("JWTtoken");
      requestParams.method = "DELETE";
      fetch(
        base_url + "wineries/wines/" + this.$route.query.id + "/" + wine.id,
        requestParams
      );
    },
    editWine(wine) {
      let info = { ...this.$route.query };
      info.wineId = wine.id;
      info.wineName = wine.name;
      info.wineType = wine.type;
      info.wineColor = wine.color;
      info.wineVariety = wine.variety;

      this.$router.push({ path: "/editWine", query: info });
    },
    addWine() {
      this.$router.push({
        path: "/addWine",
        query: { ...this.$route.query },
      });
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
</style>
