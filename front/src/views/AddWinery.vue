<template>
  <div>
    <form @submit.prevent="addWinery()">
      <label> Name </label>
      <input v-model="name" type="text" required />
      <label> Location </label>
      <input v-model="location" type="text" required />
      <label> Founding Year </label>
      <select v-model="foundingYear">
        <option
          v-for="n in Array.from(
            { length: 801 },
            (v, i) => i + (new Date().getFullYear() - 800)
          )"
          :value="n"
        >
          {{ n }}
        </option>
      </select>

      <button type="submit">Add Winery</button>
    </form>
  </div>
</template>

<script>
import { requestOptions, base_url } from "@/requestOptions";
export default {
  data() {
    return {
      name: "",
      location: "",
      foundingYear: "",
    };
  },
  methods: {
    addWinery() {
      let requestParams = { ...requestOptions };
      requestParams.headers.Authorization =
        "Bearer " + window.localStorage.getItem("JWTtoken");
      requestParams.method = "POST";
      let data = {
        name: this.name,
        location: this.location,
        foundingYear: this.foundingYear,
      };

      requestParams.body = JSON.stringify(data);
      fetch(base_url + "wineries", requestParams)
        .then((res) => res.json())
        .then((res) => {
          if (res === "Decoding failed!" || res === "Expired token") {
            console.log("Authentification Error");
          } else {
            data.id = res.id;
            this.$store.dispatch("addWinery", data);
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style></style>
