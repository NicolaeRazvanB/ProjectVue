<template>
  <div>
    <form @submit.prevent="addWine()">
      <label> Name </label>
      <input v-model="name" type="text" required />
      <label> Type </label>
      <select v-model="type">
        <option value="Dry">Dry</option>
        <option value="Slightly sweet">Slightly sweet</option>
        <option value="Strongly sweet">Strongly sweet</option>
      </select>
      <label> Variety </label>
      <select v-model="variety">
        <option v-for="wine in this.varietyList" :value="wine">
          {{ wine }}
        </option>
      </select>
      <label> Color </label>
      <select v-model="color">
        <option value="Red">Red</option>
        <option value="White">White</option>
        <option value="Rose">Rose</option>
      </select>

      <button type="submit">Add Wine</button>
    </form>
  </div>
</template>

<script>
import { requestOptions, base_url } from "@/requestOptions";
export default {
  data() {
    return {
      name: "",
      type: "",
      variety: "",
      color: "",
      varietyList: [
        "Chardonnay",
        "Cabernet Sauvignon",
        "Merlot",
        "Sauvignon ",
        "Sangiovese",
        "Pinot ",
        "Nebbiolo",
        "Riesling",
        "Syrah",
      ],
    };
  },
  methods: {
    addWine() {
      let requestParams = { ...requestOptions };
      requestParams.headers.Authorization =
        "Bearer " + window.localStorage.getItem("JWTtoken");
      requestParams.method = "POST";
      let wine = {
        name: this.name,
        type: this.type,
        variety: this.variety,
        color: this.color,
      };

      requestParams.body = JSON.stringify(wine);
      fetch(base_url + "wineries/wines/" + this.$route.query.id, requestParams)
        .then((res) => res.json())
        .then((res) => {
          if (res === "Decoding failed!" || res === "Expired token") {
            console.log("Authentification Error");
          } else {
            this.$router.push({
              path: "/wines",
              query: { ...this.$route.query },
            });
          }
        });
    },
  },
};
</script>

<style></style>
